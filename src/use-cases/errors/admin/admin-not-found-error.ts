import { ErrorType } from '@core/types/error-type'
import { DomainError } from 'errors/domain-error'
import { ADMIN_NOT_FOUND_ERROR } from 'messages/error/admin/admin-error-message'

export class AdminNotFoundError extends DomainError {
  constructor() {
    super(ADMIN_NOT_FOUND_ERROR, ErrorType.NOT_FOUND)
  }
}
