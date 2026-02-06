import { messages } from '@constants/messages'
import { DomainUnprocessableEntityError } from '@core/domain/errors/4xx-commom-http-error'

export class SupervisorDoctorCouldNotBeUpdatedError extends DomainUnprocessableEntityError {
  constructor() {
    super(messages.errors.supervisorDoctorCouldNotBeUpdated)
  }
}
