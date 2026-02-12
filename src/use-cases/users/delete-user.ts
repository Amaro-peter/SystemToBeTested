import { Result } from '@core/logic/result-pattern'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { User, UserRole } from '@prisma/client'
import { UserRepository } from '@repositories/users-repository'
import { IErrorMapper } from '@tps/error-interfaces/error-mapper.interface'
import { DeleteProfileStrategy } from '@tps/use-case/users/delete-profile-strategy.interface'
import { handleRepositoryCall } from '@use-cases/common/handle-repository-call'
import { UserAlreadyDeactivatedError } from '@use-cases/errors/users/user-already-deactivated-error'
import { UserNotFoundError } from '@use-cases/errors/users/user-not-found-error'
import { IProfileStrategyResolver } from '@tps/use-case/resolvers/profile-strategy-resolve.interface'

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
    private deleteProfileStrategyResolver: IProfileStrategyResolver<DeleteProfileStrategy>,
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
      throw new UserNotFoundError()
    }

    if (!user.isActive) {
      throw new UserAlreadyDeactivatedError()
    }

    return user
  }

  private async deactivateUserOrThrow(user: User): Promise<User> {
    const deactivatedUser = await this.usersRepository.deactivateUser(user.id)

    if (!deactivatedUser) {
      throw new UserNotFoundError()
    }

    return deactivatedUser
  }

  private async deactivateUserProfileOrThrow(user: User, role: UserRole): Promise<unknown> {
    const strategyResult = await this.deleteProfileStrategyResolver.resolve(role)

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
