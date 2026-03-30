import { ErrorType } from '@core/types/error-type'
import { DomainError } from 'errors/domain-error'
import { SUPERVISOR_DOCTOR_COULD_NOT_BE_CREATED_ERROR } from 'messages/error/supervisor-doctor/supervisor-doctor-error-messages'

export class SupervisorDoctorCouldNotBeCreatedError extends DomainError {
  constructor() {
    super(SUPERVISOR_DOCTOR_COULD_NOT_BE_CREATED_ERROR, ErrorType.BAD_REQUEST)
  }
}
