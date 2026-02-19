import { Result } from '@core/logic/result'

export interface IValidator<T> {
  validate(data: unknown): Result<T, Error>
}
