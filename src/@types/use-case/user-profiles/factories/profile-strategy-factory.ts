import { UserRole } from '@prisma/client'
import { Result } from '@core/logic/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { IProfileStrategy } from '@tps/use-case/user-profiles/strategies/profile-strategy.interface'

export type ProfileStrategyCreator = (dbContext: DatabaseContext) => IProfileStrategy

export interface IProfileStrategyFactory {
  createStrategy(role: UserRole): Result<IProfileStrategy, Error>
}
