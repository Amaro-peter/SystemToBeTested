import { Result } from '@core/logic/result'
import { User } from '@prisma/client'

export interface RegisterProfileStrategy<T = unknown> {
  execute(user: User, payLoad: unknown): Promise<Result<T, Error>>
}
