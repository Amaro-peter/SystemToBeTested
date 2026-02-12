import { Result } from '@core/logic/result-pattern'
import { UserRole } from '@prisma/client'
import { RegisterProfileStrategy } from '@tps/use-case/users/register-profile-strategy.interface'

export interface IRegisterProfileStrategyResolver {
  resolve(role: UserRole): Result<RegisterProfileStrategy, Error>
}
