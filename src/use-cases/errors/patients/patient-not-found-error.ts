import { ErrorType } from '@core/types/error-type'
import { DomainError } from 'errors/domain-error'
import { PATIENT_NOT_FOUND_ERROR } from 'messages/error/patients/patient-error-message'

export class PatientNotFoundError extends DomainError {
  constructor() {
    super(PATIENT_NOT_FOUND_ERROR, ErrorType.NOT_FOUND)
  }
}
