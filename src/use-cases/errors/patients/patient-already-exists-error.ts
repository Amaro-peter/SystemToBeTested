import { HTTPDomainError } from '@http/errors/http-domain-error'
import { PATIENT_ALREADY_EXISTS_ERROR } from 'messages/error/patients/patient-error-message'

export class PatientAlreadyExistsError extends HTTPDomainError {
  constructor() {
    super(PATIENT_ALREADY_EXISTS_ERROR, 409)
  }
}
