import { HTTPDomainError } from 'errors/http/http-domain-error'
import { INSTRUCTOR_OPERATION_FAILED_ERROR } from 'messages/error/health-professional/health-professional-error-message'

export class InstructorOperationFailedError extends HTTPDomainError {
  constructor() {
    super(INSTRUCTOR_OPERATION_FAILED_ERROR, 422)
  }
}
