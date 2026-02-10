import { HTTPDomainError } from '@http/errors/http-domain-error'
import { SUPERVISOR_DOCTOR_NOT_FOUND_ERROR } from 'messages/responses/supervisor-doctor-responses.ts/supervisor-doctor-api-responses'

export class SupervisorDoctorNotFoundError extends HTTPDomainError {
  constructor() {
    super(SUPERVISOR_DOCTOR_NOT_FOUND_ERROR, 404)
  }
}
