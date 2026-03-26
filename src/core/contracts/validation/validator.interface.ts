import { Result } from '@core/shared/result'

export interface IValidator<T> {
  validate(data: unknown): Result<T, Error>
}
