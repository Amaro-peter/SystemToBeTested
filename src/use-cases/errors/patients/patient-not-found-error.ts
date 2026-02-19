import { HTTPDomainError } from '@http/errors/http-domain-error'
import { PATIENT_NOT_FOUND_ERROR } from 'messages/error/patients/patient-error-message'

export class PatientNotFoundError extends HTTPDomainError {
  constructor() {
    super(PATIENT_NOT_FOUND_ERROR, 404)
  }
}
