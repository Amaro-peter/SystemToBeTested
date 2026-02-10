import { Result } from '@core/logic/result-pattern'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { UserRole } from '@prisma/client'
import { DeleteProfileStrategy } from '@tps/use-case/users/delete-profile-strategy.interface'
import { makeDeleteProfileStrategy } from '@use-cases/factories/strategies/make-delete-profile-strategy'
import { IDeleteProfileStrategyResolver } from '../delete-profile-strategy-resolver.interface'

export class DeleteProfileStrategyResolver implements IDeleteProfileStrategyResolver {
  constructor(private readonly dbContext: DatabaseContext) {}

  resolve(role: UserRole): Result<DeleteProfileStrategy, Error> {
    return makeDeleteProfileStrategy(role, this.dbContext)
  }
}
