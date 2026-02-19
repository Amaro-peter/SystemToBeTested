import { ok, err, Result } from '@core/logic/result'
import { User, UserRole } from '@prisma/client'
import { UserRepository } from '@repositories/users-repository'
import { IProfileStrategyFactory } from '@tps/use-case/factories/strategies/profile-strategy-factory'
import { UserAlreadyDeactivatedError } from '@use-cases/errors/users/user-already-deactivated-error'
import { UserAlreadyExistsError } from '@use-cases/errors/users/user-already-exists-error'
import { UserNotFoundError } from '@use-cases/errors/users/user-not-found-error'
import { UserOperationFailedError } from '@use-cases/errors/users/user-operation-failed-error'

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
    private profileFactory: IProfileStrategyFactory,
  ) {}

  async execute(request: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    // 1. Verificar se usuário existe e está ativo
    const userOrNull = await this.usersRepository.findBy({ publicId: request.publicId })

    if (!userOrNull) {
      return err(new UserNotFoundError())
    }

    if (!userOrNull.isActive) {
      return err(new UserAlreadyDeactivatedError())
    }

    // 2. Validar unicidade (Email/CPF) se foram alterados
    const uniquenessError = await this.checkUniqueness(userOrNull, request.email, request.cpf)
    if (uniquenessError) {
      return err(uniquenessError)
    }

    // 3. Atualizar dados do Usuário Base
    const updatedUserResult = await this.usersRepository.update(request.publicId, {
      name: request.name,
      email: request.email,
      cpf: request.cpf,
      phoneNumber: request.phoneNumber,
    })

    if (!updatedUserResult.success) {
      return err(updatedUserResult.error)
    }

    const updatedUser = updatedUserResult.value

    if (!updatedUser) {
      return err(new UserOperationFailedError())
    }

    // 4. Atualizar Perfil Específico (Se houver dados)
    let updatedUserProfile: unknown | undefined

    if (request.specificData) {
      const strategyResult = this.profileFactory.createStrategy(request.role)

      if (!strategyResult.success) {
        return err(strategyResult.error)
      }

      const updateProfileStrategy = strategyResult.value

      // O strategy deve retornar Result agora
      const profileResult = await updateProfileStrategy.execute(updatedUser, request.specificData)

      if (!profileResult.success) {
        return err(profileResult.error)
      }

      updatedUserProfile = profileResult.value
    }

    return ok({
      updatedUser,
      updatedUserProfile,
    })
  }

  // Método auxiliar para checagem de unicidade
  private async checkUniqueness(currentUser: User, email?: string, cpf?: string): Promise<Error | null> {
    if (email && email !== currentUser.email) {
      const emailExists = await this.usersRepository.findBy({ email })
      if (emailExists) {
        return new UserAlreadyExistsError()
      }
    }

    if (cpf && cpf !== currentUser.cpf) {
      const cpfExists = await this.usersRepository.findBy({ cpf })
      if (cpfExists) {
        return new UserAlreadyExistsError()
      }
    }

    return null
  }
}
