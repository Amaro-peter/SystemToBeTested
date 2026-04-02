import { User } from '@prisma/client'
import { Result } from '@core/shared/result'

export interface IUserProfileStrategy<T = unknown> {
  execute(user: User, payload?: unknown): Promise<Result<T, Error>>
}
