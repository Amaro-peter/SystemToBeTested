import { Result } from '@core/logic/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { User, UserRole } from '@prisma/client'
import { UserRepository } from '@repositories/users-repository'
import { IErrorMapper } from '@tps/error-interfaces/error-mapper.interface'
import { handleRepositoryCall } from '@use-cases/common/handle-repository-call'
import { UserAlreadyDeactivatedError } from '@use-cases/errors/users/user-already-deactivated-error'
import { UserAlreadyExistsError } from '@use-cases/errors/users/user-already-exists-error'
import { UserNotFoundError } from '@use-cases/errors/users/user-not-found-error'
import { makeUpdateProfileStrategy } from '@use-cases/factories/strategies/make-update-profile-strategy'

interface UpdateUserUseCaseRequest {
  publicId: string
  name?: string
  email?: string
  cpf?: string
  role: UserRole
  phoneNumber?: string
  specificData?: unknown
}

type UpdateUserUseCaseResponse = Result<
  {
    updatedUser: User
    updatedUserProfile?: unknown
  },
  Error
>

export class UpdateUserUseCase {
  constructor(
    private usersRepository: UserRepository,
    private dbContext: DatabaseContext,
    private userErrorMapper: IErrorMapper,
  ) {}

  async execute(request: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    return handleRepositoryCall(this.userErrorMapper, async () => {
      const currentUser = await this.findActiveUserOrThrow(request.publicId)

      await this.validateUniquenessOrThrow(currentUser, request.email, request.cpf)

      // ==========================================
      // Transaction execution - throw for rollback
      // ==========================================
      return await this.dbContext.runInTransaction(async () => {
        const updatedUser = await this.updateUserDataOrThrow(request.publicId, {
          name: request.name,
          email: request.email,
          cpf: request.cpf,
          phoneNumber: request.phoneNumber,
        })

        if (!request.specificData) {
          return { updatedUser }
        }

        const updatedUserProfile = await this.updateUserProfileOrThrow(updatedUser, request.role, request.specificData)

        return {
          updatedUser,
          updatedUserProfile,
        }
      })
    })
  }

  private async findActiveUserOrThrow(publicId: string): Promise<User> {
    const user = await this.usersRepository.findBy({ publicId })

    if (!user) {
      throw new UserNotFoundError()
    }

    if (!user.isActive) {
      throw new UserAlreadyDeactivatedError()
    }

    return user
  }

  private async validateUniquenessOrThrow(currentUser: User, email?: string, cpf?: string): Promise<void> {
    if (email && email !== currentUser.email) {
      const emailExists = await this.usersRepository.findBy({ email })
      if (emailExists) {
        throw new UserAlreadyExistsError()
      }
    }

    if (cpf && cpf !== currentUser.cpf) {
      const cpfExists = await this.usersRepository.findBy({ cpf })
      if (cpfExists) {
        throw new UserAlreadyExistsError()
      }
    }
  }

  private async updateUserDataOrThrow(
    publicId: string,
    data: {
      name?: string
      email?: string
      cpf?: string
      phoneNumber?: string
    },
  ): Promise<User> {
    const updatedUser = await this.usersRepository.update(publicId, data)

    if (!updatedUser) {
      throw new UserNotFoundError()
    }

    return updatedUser
  }

  private async updateUserProfileOrThrow(updatedUser: User, role: UserRole, specificData: unknown): Promise<unknown> {
    const strategyResult = makeUpdateProfileStrategy(role, this.dbContext)

    if (!strategyResult.success) {
      throw strategyResult.error
    }

    const updateProfileStrategy = strategyResult.value
    const profileResult = await updateProfileStrategy.execute(updatedUser, specificData)

    if (!profileResult.success) {
      throw profileResult.error
    }

    return profileResult.value
  }
}
