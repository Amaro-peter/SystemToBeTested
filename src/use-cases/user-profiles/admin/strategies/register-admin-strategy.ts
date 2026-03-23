import { err, ok, Result } from '@core/logic/result'
import { Admin, User } from '@prisma/client'
import { CreateAdminPayload } from '@repositories/admin-repository'
import { PrismaAdminRepository } from '@repositories/prisma/prisma-admin-repository'
import { IProfileStrategy } from '@tps/use-case/user-profiles/strategies/profile-strategy.interface'
import { IValidator } from '@tps/validation/validator.interface'

type AdminStrategyResponse = {
  admin: Admin
}

export class RegisterAdminStrategy implements IProfileStrategy<AdminStrategyResponse> {
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
