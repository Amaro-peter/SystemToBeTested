import { HTTPDomainError } from '@http/errors/http-domain-error'
import { SUPERVISOR_DOCTOR_COULD_NOT_BE_UPDATED_ERROR } from 'messages/responses/supervisor-doctor-responses.ts/supervisor-doctor-api-responses'

export class SupervisorDoctorCouldNotBeUpdatedError extends HTTPDomainError {
  constructor() {
    super(SUPERVISOR_DOCTOR_COULD_NOT_BE_UPDATED_ERROR, 422)
  }
}
