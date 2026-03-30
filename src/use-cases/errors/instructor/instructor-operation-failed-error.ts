import { ErrorType } from '@core/types/error-type'
import { DomainError } from 'errors/domain-error'
import { INSTRUCTOR_OPERATION_FAILED_ERROR } from 'messages/error/health-professional/health-professional-error-message'

export class InstructorOperationFailedError extends DomainError {
  constructor() {
    super(INSTRUCTOR_OPERATION_FAILED_ERROR, ErrorType.UNPROCESSABLE_ENTITY)
  }
}
