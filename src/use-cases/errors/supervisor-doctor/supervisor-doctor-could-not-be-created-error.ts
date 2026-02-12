import { HTTPDomainError } from '@http/errors/http-domain-error'
import { SUPERVISOR_DOCTOR_COULD_NOT_BE_CREATED_ERROR } from 'messages/error/supervisor-doctor/supervisor-doctor-error-messages'

export class SupervisorDoctorCouldNotBeCreatedError extends HTTPDomainError {
  constructor() {
    super(SUPERVISOR_DOCTOR_COULD_NOT_BE_CREATED_ERROR, 400)
  }
}
