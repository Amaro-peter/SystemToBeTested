import { UserRepository } from '@core/contracts/repositories/users-repository'
import { IProfileStrategyFactory } from '@core/contracts/use-case/user-profiles/factories/profile-strategy-factory.interface'
import { ok, err, Result } from '@core/shared/result'
import { User, UserRole } from '@prisma/client'
import { UserAlreadyDeactivatedError } from '@use-cases/errors/users/user-already-deactivated-error'
import { UserNotFoundError } from '@use-cases/errors/users/user-not-found-error'

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
    private profileFactory: IProfileStrategyFactory,
  ) {}

  async execute({ publicId, role }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    // 1. Busca usuário
    const user = await this.usersRepository.findBy({ publicId })

    if (!user) {
      return err(new UserNotFoundError())
    }

    if (!user.isActive) {
      return err(new UserAlreadyDeactivatedError())
    }

    // 2. Desativa Perfil Específico (Factory -> Strategy)
    const strategyResult = this.profileFactory.createStrategy(role)

    if (!strategyResult.success) {
      return err(strategyResult.error)
    }

    const deleteStrategy = strategyResult.value

    const profileResult = await deleteStrategy.execute(user)

    if (!profileResult.success) {
      return err(profileResult.error)
    }

    const deactivatedUserProfile = profileResult.value

    // 3. Desativa Usuário Base
    const deactivatedUserResult = await this.usersRepository.deactivateUser(user.id)

    if (!deactivatedUserResult.success) {
      return err(deactivatedUserResult.error)
    }

    return ok({
      deactivatedUser: deactivatedUserResult.value,
      deactivatedUserProfile,
    })
  }
}
