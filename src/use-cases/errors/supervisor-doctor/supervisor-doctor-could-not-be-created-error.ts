import { messages } from '@constants/messages'
import { DomainError } from '@core/domain/errors/domain-error'

export class SupervisorDoctorCouldNotBeCreatedError extends DomainError {
  constructor() {
    super(messages.errors.supervisorDoctorCouldNotBeCreated)
  }
}
