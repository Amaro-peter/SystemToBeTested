import { Result } from '@core/logic/result'
import { UserRole } from '@prisma/client'

export interface IProfileStrategyResolver<T> {
  resolve(role: UserRole): Promise<Result<T, Error>>
}
