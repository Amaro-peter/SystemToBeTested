import { Result } from '@core/logic/result-pattern'

export interface IValidator<T> {
  validate(data: unknown): Result<T, Error>
}
