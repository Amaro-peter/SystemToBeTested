import { Result } from '@core/logic/result-pattern'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { UserRole } from '@prisma/client'
import { RegisterProfileStrategy } from '@tps/use-case/users/register-profile-strategy.interface'
import { makeRegisterProfileStrategy } from '@use-cases/factories/strategies/make-register-profile-strategy'
import { IRegisterProfileStrategyResolver } from '../register-profile-strategy-resolver.interface'

export class RegisterProfileStrategyResolver implements IRegisterProfileStrategyResolver {
  constructor(private readonly dbContext: DatabaseContext) {}

  resolve(role: UserRole): Result<RegisterProfileStrategy, Error> {
    return makeRegisterProfileStrategy(role, this.dbContext)
  }
}
