import { HTTPDomainError } from '@http/errors/http-domain-error'
import { SUPERVISOR_DOCTOR_ALREADY_EXISTS_ERROR } from 'messages/responses/supervisor-doctor-responses.ts/supervisor-doctor-api-responses'

export class SupervisorDoctorAlreadyExistsError extends HTTPDomainError {
  constructor() {
    super(SUPERVISOR_DOCTOR_ALREADY_EXISTS_ERROR, 409)
  }
}
