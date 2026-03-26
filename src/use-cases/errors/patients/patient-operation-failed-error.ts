import { HTTPDomainError } from 'errors/http/http-domain-error'
import { PATIENT_OPERATION_FAILED_ERROR } from 'messages/error/patients/patient-error-message'

export class PatientOperationFailedError extends HTTPDomainError {
  constructor() {
    super(PATIENT_OPERATION_FAILED_ERROR, 422)
  }
}
