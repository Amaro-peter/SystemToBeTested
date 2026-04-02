import { Admin, User } from '@prisma/client'
import { CreateAdminPayload } from '@core/contracts/repositories/admin-repository.interface'
import { IUserProfileStrategy } from '@core/contracts/use-case/user-profiles/strategies/user-profile-strategy.interface'
import { IValidator } from '@core/contracts/validation/validator.interface'
import { err, ok, Result } from '@core/shared/result'
import { PrismaAdminRepository } from '@repositories/prisma/prisma-admin-repository'

type AdminStrategyResponse = {
  admin: Admin
}

export class RegisterAdminStrategy implements IUserProfileStrategy<AdminStrategyResponse> {
  constructor(
    private adminRepository: PrismaAdminRepository,
    private validator: IValidator<CreateAdminPayload>,
  ) {}

  async execute(user: User, payload?: unknown): Promise<Result<AdminStrategyResponse, Error>> {
    const validationResult = this.validator.validate(payload)

    if (!validationResult.success) {
      return err(validationResult.error)
    }

    const specificData = validationResult.value

    const adminResult = await this.adminRepository.create(user.id, {
      ...specificData,
    })

    if (!adminResult.success) {
      return err(adminResult.error)
    }

    return ok({
      admin: adminResult.value,
    })
  }
}
