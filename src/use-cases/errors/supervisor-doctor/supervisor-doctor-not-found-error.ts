import { ErrorType } from '@core/types/error-type'
import { DomainError } from 'errors/domain-error'
import { SUPERVISOR_DOCTOR_NOT_FOUND_ERROR } from 'messages/error/supervisor-doctor/supervisor-doctor-error-messages'

export class SupervisorDoctorNotFoundError extends DomainError {
  constructor() {
    super(SUPERVISOR_DOCTOR_NOT_FOUND_ERROR, ErrorType.NOT_FOUND)
  }
}
