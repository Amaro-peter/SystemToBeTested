import { HTTPDomainError } from '@http/errors/http-domain-error'
import { HEALTH_PROFESSIONAL_ALREADY_EXISTS_ERROR } from 'messages/error/health-professional/health-professional-error-message'

export class HealthProfessionalAlreadyExistsError extends HTTPDomainError {
  constructor() {
    super(HEALTH_PROFESSIONAL_ALREADY_EXISTS_ERROR, 409)
  }
}
