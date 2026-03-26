import { HTTPDomainError } from 'errors/http/http-domain-error'
import { INSTRUCTOR_ALREADY_EXISTS_ERROR } from 'messages/error/health-professional/health-professional-error-message'

export class InstructorAlreadyExistsError extends HTTPDomainError {
  constructor() {
    super(INSTRUCTOR_ALREADY_EXISTS_ERROR, 409)
  }
}
