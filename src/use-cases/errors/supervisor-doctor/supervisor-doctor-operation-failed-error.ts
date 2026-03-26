import { HTTPDomainError } from 'errors/http/http-domain-error'
import { SUPERVISOR_DOCTOR_OPERATION_FAILED_ERROR } from 'messages/error/supervisor-doctor/supervisor-doctor-error-messages'

export class SupervisorDoctorOperationFailedError extends HTTPDomainError {
  constructor() {
    super(SUPERVISOR_DOCTOR_OPERATION_FAILED_ERROR, 422)
  }
}
