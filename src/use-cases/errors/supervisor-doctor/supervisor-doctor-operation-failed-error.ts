import { ErrorType } from '@core/types/error-type'
import { DomainError } from 'errors/domain-error'
import { SUPERVISOR_DOCTOR_OPERATION_FAILED_ERROR } from 'messages/error/supervisor-doctor/supervisor-doctor-error-messages'

export class SupervisorDoctorOperationFailedError extends DomainError {
  constructor() {
    super(SUPERVISOR_DOCTOR_OPERATION_FAILED_ERROR, ErrorType.UNPROCESSABLE_ENTITY)
  }
}
