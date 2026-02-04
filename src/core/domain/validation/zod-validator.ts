import z from "zod";
import { IValidator } from "./validator.interface";
import { err, ok, Result } from "@core/logic/result-pattern";


export class ZodValidator<T> implements IValidator<T> {
  constructor(private schema: z.ZodType<T>) {}

  validate(data: unknown): Result<T, Error> {
    const result = this.schema.safeParse(data)

    if (!result.success) {
      return err(result.error)
    }

    return ok(result.data)
  }
}