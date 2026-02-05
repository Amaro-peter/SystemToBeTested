import { User } from '@prisma/client'
import { Result } from '@core/logic/result-pattern'

export interface UpdateProfileStrategy<T = unknown> {
  execute(user: User, payload: unknown): Promise<Result<T, Error>>
}
