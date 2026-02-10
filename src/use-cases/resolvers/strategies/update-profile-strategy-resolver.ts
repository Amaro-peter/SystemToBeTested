import { Result } from '@core/logic/result-pattern'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { UserRole } from '@prisma/client'
import { UpdateProfileStrategy } from '@tps/use-case/users/update-profile-strategy.interface'
import { makeUpdateProfileStrategy } from '@use-cases/factories/strategies/make-update-profile-strategy'
import { IUpdateProfileStrategyResolver } from '../update-profile-strategy-resolver.interface'

export class UpdateProfileStrategyResolver implements IUpdateProfileStrategyResolver {
  constructor(private readonly dbContext: DatabaseContext) {}

  resolve(role: UserRole): Result<UpdateProfileStrategy, Error> {
    return makeUpdateProfileStrategy(role, this.dbContext)
  }
}
