import { ErrorType } from '@core/types/error-type'
import { DomainError } from 'errors/domain-error'
import { INSTRUCTOR_ALREADY_EXISTS_ERROR } from 'messages/error/instructor/instructor-error-message'

export class InstructorAlreadyExistsError extends DomainError {
  constructor() {
    super(INSTRUCTOR_ALREADY_EXISTS_ERROR, ErrorType.CONFLICT)
  }
}
