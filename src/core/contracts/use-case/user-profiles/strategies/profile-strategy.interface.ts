import { User } from '@prisma/client'
import { Result } from '@core/shared/result'

export interface IProfileStrategy<T = unknown> {
  execute(user: User, payload?: unknown): Promise<Result<T, Error>>
}
