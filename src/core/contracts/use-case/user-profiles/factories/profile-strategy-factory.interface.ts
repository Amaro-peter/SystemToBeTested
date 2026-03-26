import { UserRole } from '@prisma/client'
import { Result } from '@core/shared/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { IProfileStrategy } from '../strategies/profile-strategy.interface'

export type ProfileStrategyCreator = (dbContext: DatabaseContext) => IProfileStrategy

export interface IProfileStrategyFactory {
  createStrategy(role: UserRole): Result<IProfileStrategy, Error>
}
