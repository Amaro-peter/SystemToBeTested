import { Result } from '@core/logic/result-pattern'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { UserRole } from '@prisma/client'
import { IProfileStrategyResolver } from '@tps/use-case/resolvers/profile-strategy-resolve.interface'
import { UpdateProfileStrategy } from '@tps/use-case/users/update-profile-strategy.interface'
import { makeUpdateProfileStrategy } from '@use-cases/factories/strategies/make-update-profile-strategy'

export class UpdateProfileStrategyResolver implements IProfileStrategyResolver<UpdateProfileStrategy> {
  constructor(private readonly dbContext: DatabaseContext) {}

  async resolve(role: UserRole): Promise<Result<UpdateProfileStrategy, Error>> {
    return makeUpdateProfileStrategy(role, this.dbContext)
  }
}
