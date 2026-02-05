import { messages } from '@constants/messages'
import { DomainNotFoundError } from '@core/domain/errors/4xx-commom-http-error'

export class SupervisorDoctorNotFoundError extends DomainNotFoundError {
  constructor() {
    super(messages.errors.supervisorDoctorNotFound)
  }
}