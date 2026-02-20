import { err, ok, Result } from '@core/logic/result'
import { env } from '@env/index'
import { User, UserRole } from '@prisma/client'
import { UserRepository } from '@repositories/users-repository'
import { IProfileStrategyFactory } from '@tps/use-case/user-profiles/factories/profile-strategy-factory'
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
    private profileFactory: IProfileStrategyFactory,
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
    const existingUser = await this.usersRepository.findByEmailOrCpf(email, cpf)

    if (existingUser) {
      return err(new UserAlreadyExistsError())
    }

    const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

    const userResult = await this.usersRepository.create({
      name,
      email,
      cpf,
      phoneNumber,
      passwordHash,
      role,
    })

    if (!userResult.success) {
      return err(userResult.error)
    }

    const user = userResult.value

    if (!user) {
      return err(new UserCouldNotBeCreatedError())
    }

    // 2. Criação do Perfil Específico
    // Obtém a estratégia através da Factory injetada
    const strategyResult = this.profileFactory.createStrategy(role)

    if (!strategyResult.success) {
      // Se estiver usando o Decorator de Transação, retornar erro aqui causará Rollback
      return err(strategyResult.error)
    }

    const registerProfileStrategy = strategyResult.value

    // Executa a estratégia (que também deve retornar Result)
    const profileResult = await registerProfileStrategy.execute(user, specificData)

    if (!profileResult.success) {
      return err(profileResult.error)
    }

    return ok({
      user,
      userProfile: profileResult.value,
    })
  }
}
