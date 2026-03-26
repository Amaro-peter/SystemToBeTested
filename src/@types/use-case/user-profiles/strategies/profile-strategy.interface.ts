import { User } from '@prisma/client'
import { Result } from '@core/logic/result'

export interface IProfileStrategy<T = unknown> {
  execute(user: User, payload?: unknown): Promise<Result<T, Error>>
}
