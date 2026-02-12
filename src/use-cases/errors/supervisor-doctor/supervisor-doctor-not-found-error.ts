import { HTTPDomainError } from '@http/errors/http-domain-error'
import { SUPERVISOR_DOCTOR_NOT_FOUND_ERROR } from 'messages/error/supervisor-doctor/supervisor-doctor-error-messages'

export class SupervisorDoctorNotFoundError extends HTTPDomainError {
  constructor() {
    super(SUPERVISOR_DOCTOR_NOT_FOUND_ERROR, 404)
  }
}
