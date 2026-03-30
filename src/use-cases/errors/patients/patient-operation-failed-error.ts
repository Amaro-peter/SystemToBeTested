import { ErrorType } from '@core/types/error-type'
import { DomainError } from 'errors/domain-error'
import { PATIENT_OPERATION_FAILED_ERROR } from 'messages/error/patients/patient-error-message'

export class PatientOperationFailedError extends DomainError {
  constructor() {
    super(PATIENT_OPERATION_FAILED_ERROR, ErrorType.UNPROCESSABLE_ENTITY)
  }
}
