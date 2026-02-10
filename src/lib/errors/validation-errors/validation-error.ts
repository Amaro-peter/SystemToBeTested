import { IErrorDetail } from '@tps/error-interfaces/error-detail.interface'
import { BaseError } from 'errors/base-error'
import { VALIDATION_ERROR } from 'messages/responses/validation-responses.ts/validation-responses'
import { ZodError } from 'zod'

export class ValidationError extends BaseError {
  constructor(zodError: ZodError) {
    const issues: Record<string, string> = {}

    zodError.issues.forEach((issue) => {
      const path = issue.path.join('.')
      if (!issues[path]) {
        issues[path] = issue.message
      }
    })

    const errorDetail: IErrorDetail = {
      code: VALIDATION_ERROR.code,
      message: VALIDATION_ERROR.message,
      issues,
    }

    super(errorDetail, 400)
  }
}
