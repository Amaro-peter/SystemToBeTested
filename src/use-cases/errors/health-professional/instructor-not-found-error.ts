import { HTTPDomainError } from '@http/errors/http-domain-error'
import { INSTRUCTOR_NOT_FOUND_ERROR } from 'messages/error/health-professional/health-professional-error-message'

export class InstructorNotFoundError extends HTTPDomainError {
  constructor() {
    super(INSTRUCTOR_NOT_FOUND_ERROR, 404)
  }
}
