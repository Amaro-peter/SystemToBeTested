import { IErrorMapper } from '@core/domain/errors/error-mappers/error-mapper.interface'
import { Result } from '@core/logic/result-pattern'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { User, UserRole } from '@prisma/client'
import { UserRepository } from '@repositories/users-repository'
import { handleRepositoryCall } from '@use-cases/common/handle-repository-call'
import { ResourceNotFoundError } from '@use-cases/errors/resource-not-found-error'
import { UserAlreadyDeactivatedError } from '@use-cases/errors/users/user-already-deactivated-error'
import { DeleteProfileStrategyResolver } from '@use-cases/resolvers/delete-profile-strategy-resolver.interface'

interface DeleteUserUseCaseRequest {
  publicId: string
  role: UserRole
}

type DeleteUserUseCaseResponse = Result<
  {
    deactivatedUser: User
    deactivatedUserProfile: unknown
  },
  Error
>

export class DeleteUserUseCase {
  constructor(
    private usersRepository: UserRepository,
    private dbContext: DatabaseContext,
    private userErrorMapper: IErrorMapper,
    private deleteProfileStrategyResolver: DeleteProfileStrategyResolver,
  ) {}

  async execute({ publicId, role }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    return handleRepositoryCall(this.userErrorMapper, async () => {
      const user = await this.findActiveUserOrThrow(publicId)

      // ==========================================
      // Transaction execution - throw for rollback
      // ==========================================
      return await this.dbContext.runInTransaction(async () => {
        const deactivatedUserProfile = await this.deactivateUserProfileOrThrow(user, role)

        const deactivatedUser = await this.deactivateUserOrThrow(user)

        return {
          deactivatedUser,
          deactivatedUserProfile,
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

  private async deactivateUserOrThrow(user: User): Promise<User> {
    const deactivatedUser = await this.usersRepository.deactivateUser(user.id)

    if (!deactivatedUser) {
      throw new ResourceNotFoundError()
    }

    return deactivatedUser
  }

  private async deactivateUserProfileOrThrow(user: User, role: UserRole): Promise<unknown> {
    const strategyResult = this.deleteProfileStrategyResolver.resolve(role)

    if (!strategyResult.success) {
      throw strategyResult.error
    }

    const deleteProfileStrategy = strategyResult.value
    const profileResult = await deleteProfileStrategy.execute(user)

    if (!profileResult.success) {
      throw profileResult.error
    }

    return profileResult.value
  }
}
