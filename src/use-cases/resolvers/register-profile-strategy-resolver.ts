import { Result } from '@core/logic/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { UserRole } from '@prisma/client'
import { IProfileStrategyResolver } from '@tps/use-case/resolvers/profile-strategy-resolver.interface'
import { RegisterProfileStrategy } from '@tps/use-case/users/register-profile-strategy.interface'
import { makeRegisterProfileStrategy } from '@use-cases/factories/strategies/make-register-profile-strategy'

export class RegisterProfileStrategyResolver implements IProfileStrategyResolver<RegisterProfileStrategy> {
  constructor(private readonly dbContext: DatabaseContext) {}

  async resolve(role: UserRole): Promise<Result<RegisterProfileStrategy, Error>> {
    return makeRegisterProfileStrategy(role, this.dbContext)
  }
}
