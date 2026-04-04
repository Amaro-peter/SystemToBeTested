import { ErrorType } from '@core/types/error-type'
import { DomainError } from 'errors/domain-error'
import { INSTRUCTOR_NOT_FOUND_ERROR } from 'messages/error/instructor/instructor-error-message'

export class InstructorNotFoundError extends DomainError {
  constructor() {
    super(INSTRUCTOR_NOT_FOUND_ERROR, ErrorType.NOT_FOUND)
  }
}
