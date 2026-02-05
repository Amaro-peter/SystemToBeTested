import { User } from '@prisma/client'
import { Result } from '@core/logic/result-pattern'

export interface DeleteProfileStrategy<T = unknown> {
  execute(user: User): Promise<Result<T, Error>>
}
