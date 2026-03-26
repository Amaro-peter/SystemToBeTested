import z from 'zod'
import { err, ok, Result } from '@core/logic/result'
import { ValidationError } from '@lib/errors/validation-errors/validation-error'
import { IValidator } from '../../@types/validation/validator.interface'

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
