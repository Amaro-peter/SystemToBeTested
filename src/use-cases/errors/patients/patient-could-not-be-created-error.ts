import { HTTPDomainError } from 'errors/http/http-domain-error'
import { PATIENT_COULD_NOT_BE_CREATED_ERROR } from 'messages/error/patients/patient-error-message'

export class PatientCouldNotBeCreatedError extends HTTPDomainError {
  constructor() {
    super(PATIENT_COULD_NOT_BE_CREATED_ERROR, 400)
  }
}
