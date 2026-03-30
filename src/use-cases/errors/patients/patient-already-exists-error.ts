import { ErrorType } from '@core/types/error-type'
import { DomainError } from 'errors/domain-error'
import { PATIENT_ALREADY_EXISTS_ERROR } from 'messages/error/patients/patient-error-message'

export class PatientAlreadyExistsError extends DomainError {
  constructor() {
    super(PATIENT_ALREADY_EXISTS_ERROR, ErrorType.CONFLICT)
  }
}
