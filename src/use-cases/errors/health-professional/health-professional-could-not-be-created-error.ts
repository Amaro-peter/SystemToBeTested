import { HTTPDomainError } from '@http/errors/http-domain-error'
import { HEALTH_PROFESSIONAL_COULD_NOT_BE_CREATED_ERROR } from 'messages/error/health-professional/health-professional-error-message'

export class HealthProfessionalCouldNotBeCreatedError extends HTTPDomainError {
  constructor() {
    super(HEALTH_PROFESSIONAL_COULD_NOT_BE_CREATED_ERROR, 400)
  }
}
