import { Result } from '@core/logic/result-pattern'
import { UserRole } from '@prisma/client'
import { DeleteProfileStrategy } from '@use-cases/strategies/delete-user-profile-strategy/delete-profile-strategy.interface'

export interface DeleteProfileStrategyResolver {
  resolve(role: UserRole): Result<DeleteProfileStrategy, Error>
}
