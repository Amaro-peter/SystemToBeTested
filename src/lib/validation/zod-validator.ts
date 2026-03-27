import { err, ok, Result } from '@core/shared/result'
import { ValidationError } from '@lib/errors/validation-errors/validation-error'
import z from 'zod'
import { IValidator } from '../../core/contracts/validation/validator.interface'

export class ZodValidator<T> implements IValidator<T> {
  constructor(private schema: z.ZodType<T>) {}

  validate(data: unknown): Result<T, Error> {
    const result = this.schema.safeParse(data)

    if (!result.success) {
      return err(new ValidationError(result.error))
    }

    return ok(result.data)
  }
}
