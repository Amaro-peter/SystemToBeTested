import { messages } from '@constants/messages'
import { DomainError } from '@core/domain/errors/domain-error'

export class SupervisorDoctorAlreadyExistsError extends DomainError {
  constructor() {
    super(messages.validation.superVisorDoctorAlreadyExists)
  }
}
