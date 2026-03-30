import { ErrorType } from '@core/types/error-type'
import { DomainError } from 'errors/domain-error'
import { INSTRUCTOR_COULD_NOT_BE_CREATED_ERROR } from 'messages/error/health-professional/health-professional-error-message'

export class InstructorCouldNotBeCreatedError extends DomainError {
  constructor() {
    super(INSTRUCTOR_COULD_NOT_BE_CREATED_ERROR, ErrorType.BAD_REQUEST)
  }
}
