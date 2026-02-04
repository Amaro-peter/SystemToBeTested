import { User } from '@prisma/client'
import { Result } from '@core/logic/result-pattern'
import { DomainError } from '@core/domain/errors/domain-error'

export interface UpdateProfileStrategy<T = unknown> {
  execute(user: User, payload: unknown): Promise<Result<T, DomainError>>
}
