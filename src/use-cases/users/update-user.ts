import { IErrorMapper } from '@core/domain/errors/error-mappers/error-mapper.interface'
import { Result } from '@core/logic/result-pattern'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { User, UserRole } from '@prisma/client'
import { UserRepository } from '@repositories/users-repository'
import { handleRepositoryCall } from '@use-cases/common/handle-repository-call'
import { ResourceNotFoundError } from '@use-cases/errors/resource-not-found-error'
import { UserAlreadyDeactivatedError } from '@use-cases/errors/users/user-already-deactivated-error'
import { UserAlreadyExistsError } from '@use-cases/errors/users/user-already-exists-error'
import { UpdateProfileStrategyResolver } from '@use-cases/resolvers/update-profile-strategy-resolver.interface'

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
    private updateProfileStrategyResolver: UpdateProfileStrategyResolver,
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
      throw new ResourceNotFoundError()
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
      throw new ResourceNotFoundError()
    }

    return updatedUser
  }

  private async updateUserProfileOrThrow(updatedUser: User, role: UserRole, specificData: unknown): Promise<unknown> {
    const strategyResult = this.updateProfileStrategyResolver.resolve(role)

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
