import { Result } from '@core/logic/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { UserRole } from '@prisma/client'
import { IProfileStrategyResolver } from '@tps/use-case/resolvers/profile-strategy-resolver.interface'
import { DeleteProfileStrategy } from '@tps/use-case/users/delete-profile-strategy.interface'
import { makeDeleteProfileStrategy } from '@use-cases/factories/strategies/make-delete-profile-strategy'

export class DeleteProfileStrategyResolver implements IProfileStrategyResolver<DeleteProfileStrategy> {
  constructor(private readonly dbContext: DatabaseContext) {}

  async resolve(role: UserRole): Promise<Result<DeleteProfileStrategy, Error>> {
    return makeDeleteProfileStrategy(role, this.dbContext)
  }
}
