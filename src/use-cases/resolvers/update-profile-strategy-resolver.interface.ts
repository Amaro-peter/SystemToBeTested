import { Result } from '@core/logic/result-pattern'
import { UserRole } from '@prisma/client'
import { UpdateProfileStrategy } from '@use-cases/strategies/update-user-profile-strategy/update-profile-strategy.interface'

export interface UpdateProfileStrategyResolver {
  resolve(role: UserRole): Result<UpdateProfileStrategy, Error>
}
