import { Result } from '@core/logic/result'
import { User } from '@prisma/client'

export interface UpdateProfileStrategy<T = unknown> {
  execute(user: User, payload: unknown): Promise<Result<T, Error>>
}
