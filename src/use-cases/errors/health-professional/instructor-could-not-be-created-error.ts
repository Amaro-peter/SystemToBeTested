import { HTTPDomainError } from '@http/errors/http-domain-error'
import { INSTRUCTOR_COULD_NOT_BE_CREATED_ERROR } from 'messages/error/health-professional/health-professional-error-message'

export class InstructorCouldNotBeCreatedError extends HTTPDomainError {
  constructor() {
    super(INSTRUCTOR_COULD_NOT_BE_CREATED_ERROR, 400)
  }
}
