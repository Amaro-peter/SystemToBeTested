import { ErrorType } from '@core/types/error-type'
import { DomainError } from 'errors/domain-error'
import { ADMIN_OPERATION_FAILED_ERROR } from 'messages/error/admin/admin-error-message'

export class AdminOperationFailedError extends DomainError {
  constructor() {
    super(ADMIN_OPERATION_FAILED_ERROR, ErrorType.BAD_REQUEST)
  }
}
