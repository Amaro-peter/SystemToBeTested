import { HTTPDomainError } from '@http/errors/http-domain-error'
import { HEALTH_PROFESSIONAL_NOT_FOUND_ERROR } from 'messages/error/health-professional/health-professional-error-message'

export class HealthProfessionalNotFoundError extends HTTPDomainError {
  constructor() {
    super(HEALTH_PROFESSIONAL_NOT_FOUND_ERROR, 404)
  }
}
