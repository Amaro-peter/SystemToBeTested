import { Result } from '@core/logic/result-pattern'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { UserRole } from '@prisma/client'
import { makeUpdateProfileStrategy } from '@use-cases/factories/strategies/make-update-profile-strategy'
import { UpdateProfileStrategy } from '@use-cases/strategies/update-user-profile-strategy/update-profile-strategy.interface'
import { UpdateProfileStrategyResolver } from '../update-profile-strategy-resolver.interface'

export class PrismaUpdateProfileStrategyResolver implements UpdateProfileStrategyResolver {
  constructor(private readonly dbContext: DatabaseContext) {}

  resolve(role: UserRole): Result<UpdateProfileStrategy, Error> {
    return makeUpdateProfileStrategy(role, this.dbContext)
  }
}
