import { Result } from '@core/logic/result'
import { env } from '@env/index'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { User, UserRole } from '@prisma/client'
import { UserRepository } from '@repositories/users-repository'
import { IErrorMapper } from '@tps/error-interfaces/error-mapper.interface'
import { IProfileStrategyResolver } from '@tps/use-case/resolvers/profile-strategy-resolver.interface'
import { RegisterProfileStrategy } from '@tps/use-case/users/register-profile-strategy.interface'
import { handleRepositoryCall } from '@use-cases/common/handle-repository-call'
import { UserAlreadyExistsError } from '@use-cases/errors/users/user-already-exists-error'
import { UserCouldNotBeCreatedError } from '@use-cases/errors/users/user-could-not-be-created-error'
import { hash } from 'bcryptjs'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  cpf: string
  phoneNumber: string
  password: string
  role: UserRole
  specificData: unknown
}

type RegisterUserUseCaseResponse = Result<
  {
    user: User
    userProfile: unknown
  },
  Error
>

export class RegisterUserUseCase {
  constructor(
    private usersRepository: UserRepository,
    private dbContext: DatabaseContext,
    private userErrorMapper: IErrorMapper,
    private registerProfileStrategyResolver: IProfileStrategyResolver<RegisterProfileStrategy>,
  ) {}

  async execute({
    name,
    email,
    cpf,
    phoneNumber,
    password,
    role,
    specificData,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    return handleRepositoryCall(this.userErrorMapper, async () => {
      await this.validateUniquenessOrThrow(email, cpf)

      const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

      return await this.dbContext.runInTransaction(async () => {
        const user = await this.usersRepository.create({
          name,
          email,
          cpf,
          phoneNumber,
          passwordHash,
          role,
        })

        if (!user) {
          throw new UserCouldNotBeCreatedError()
        }

        const userProfile = await this.registerUserProfileOrThrow(user, role, specificData)

        return {
          user,
          userProfile,
        }
      })
    })
  }

  private async validateUniquenessOrThrow(email: string, cpf: string): Promise<void> {
    const existingUser = await this.usersRepository.findByEmailOrCpf(email, cpf)
    if (existingUser) {
      throw new UserAlreadyExistsError()
    }
  }

  private async registerUserProfileOrThrow(user: User, role: UserRole, specificData: unknown): Promise<unknown> {
    const strategyResult = await this.registerProfileStrategyResolver.resolve(role)

    if (!strategyResult.success) {
      throw strategyResult.error
    }

    const registerProfileStrategy = strategyResult.value
    const profileResult = await registerProfileStrategy.execute(user, specificData)

    if (!profileResult.success) {
      throw profileResult.error
    }

    return profileResult.value
  }
}
