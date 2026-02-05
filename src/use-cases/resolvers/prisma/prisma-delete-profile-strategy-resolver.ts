import { Result } from '@core/logic/result-pattern'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { UserRole } from '@prisma/client'
import { makeDeleteProfileStrategy } from '@use-cases/factories/strategies/make-delete-profile-strategy'
import { DeleteProfileStrategy } from '@use-cases/strategies/delete-user-profile-strategy/delete-profile-strategy.interface'
import { DeleteProfileStrategyResolver } from '../delete-profile-strategy-resolver.interface'

export class PrismaDeleteProfileStrategyResolver implements DeleteProfileStrategyResolver {
  constructor(private readonly dbContext: DatabaseContext) {}

  resolve(role: UserRole): Result<DeleteProfileStrategy, Error> {
    return makeDeleteProfileStrategy(role, this.dbContext)
  }
}
