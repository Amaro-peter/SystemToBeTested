import { ZodError } from 'zod'
import { IErrorDetail } from '@core/contracts/errors/error-detail.interface'
import { ErrorType } from '@core/types/error-type'
import { AppError } from 'errors/app-error'
import { VALIDATION_ERROR } from 'messages/error/validation-messages/validation-error-messages'

export class ValidationError extends AppError {
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

    super(errorDetail, ErrorType.BAD_REQUEST)
  }
}
