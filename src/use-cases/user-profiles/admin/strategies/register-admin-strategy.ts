import { IAdmin } from '@core/contracts/repositories/admin-repository.interface'
import { IUser } from '@core/contracts/repositories/users-repository.interface'
import { IUserProfileStrategy } from '@core/contracts/use-case/user-profiles/strategies/user-profile-strategy.interface'
import { err, ok, Result } from '@core/shared/result'
import { PrismaAdminRepository } from '@repositories/prisma/prisma-admin-repository'

type AdminStrategyResponse = {
  admin: IAdmin
}

export class RegisterAdminStrategy implements IUserProfileStrategy<AdminStrategyResponse> {
  constructor(private adminRepository: PrismaAdminRepository) {}

  async execute(user: IUser): Promise<Result<AdminStrategyResponse, Error>> {
    const adminResult = await this.adminRepository.create(user.id, {})

    if (adminResult.success === false) {
      return err(adminResult.error)
    }

    return ok({
      admin: adminResult.value,
    })
  }
}
