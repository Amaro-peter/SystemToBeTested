import { HTTPDomainError } from 'errors/http/http-domain-error'
import { ADMIN_OPERATION_FAILED_ERROR } from 'messages/error/admin/admin-error-message'

export class AdminOperationFailedError extends HTTPDomainError {
  constructor() {
    super(ADMIN_OPERATION_FAILED_ERROR, 422)
  }
}
