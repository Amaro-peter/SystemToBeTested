import { ErrorType } from '@core/types/error-type'
import { DomainError } from 'errors/domain-error'
import { SUPERVISOR_DOCTOR_ALREADY_EXISTS_ERROR } from 'messages/error/supervisor-doctor/supervisor-doctor-error-messages'

export class SupervisorDoctorAlreadyExistsError extends DomainError {
  constructor() {
    super(SUPERVISOR_DOCTOR_ALREADY_EXISTS_ERROR, ErrorType.CONFLICT)
  }
}
