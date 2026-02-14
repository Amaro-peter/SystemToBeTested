import { Result } from '@core/logic/result'
import { User } from '@prisma/client'

export interface DeleteProfileStrategy<T = unknown> {
  execute(user: User): Promise<Result<T, Error>>
}
