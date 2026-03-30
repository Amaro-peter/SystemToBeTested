import { ErrorType } from '@core/types/error-type'
import { DomainError } from 'errors/domain-error'
import { PATIENT_COULD_NOT_BE_CREATED_ERROR } from 'messages/error/patients/patient-error-message'

export class PatientCouldNotBeCreatedError extends DomainError {
  constructor() {
    super(PATIENT_COULD_NOT_BE_CREATED_ERROR, ErrorType.BAD_REQUEST)
  }
}
