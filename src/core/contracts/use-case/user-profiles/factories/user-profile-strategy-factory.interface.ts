import { UserRole } from '@prisma/client'
import { Result } from '@core/shared/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { IUserProfileStrategy } from '../strategies/user-profile-strategy.interface'

export type UserProfileStrategyCreatorType = (dbContext: DatabaseContext) => IUserProfileStrategy

export interface IUserProfileStrategyFactory {
  createStrategy(role: UserRole): Result<IUserProfileStrategy, Error>
}
