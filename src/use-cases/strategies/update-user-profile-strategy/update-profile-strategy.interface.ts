import { DomainError } from '@core/domain/errors/domain-error'
import { ResultPattern } from '@core/logic/result-pattern'
import { User } from '@prisma/client'

export interface UpdateRegisterProfileStrategy<T = unknown> {
  execute(user: User, payLoad: unknown): Promise<ResultPattern<DomainError, T>>
}