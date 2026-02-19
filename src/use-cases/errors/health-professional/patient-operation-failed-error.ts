import { HTTPDomainError } from '@http/errors/http-domain-error'
import { HEALTH_PROFESSIONAL_OPERATION_FAILED_ERROR } from 'messages/error/health-professional/health-professional-error-message'

export class HealthProfessionalOperationFailedError extends HTTPDomainError {
  constructor() {
    super(HEALTH_PROFESSIONAL_OPERATION_FAILED_ERROR, 422)
  }
}
