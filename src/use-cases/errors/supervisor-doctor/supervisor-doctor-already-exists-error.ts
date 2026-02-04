import { messages } from '@constants/messages'
import { DomainConflictError } from '@core/domain/errors/4xx-commom-http-error'

export class SupervisorDoctorAlreadyExistsError extends DomainConflictError {
  constructor() {
    super(messages.validation.superVisorDoctorAlreadyExists)
  }
}
