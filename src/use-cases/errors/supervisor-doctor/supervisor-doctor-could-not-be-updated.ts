import { messages } from '@constants/messages'
import { DomainError } from '@core/domain/errors/domain-error'

export class SupervisorDoctorCouldNotBeUpdatedError extends DomainError {
  constructor() {
    super(messages.errors.supervisorDoctorCouldNotBeUpdated)
  }
}
