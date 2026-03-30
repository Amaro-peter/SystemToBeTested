import { ErrorType } from '@core/types/error-type'
import { DomainError } from 'errors/domain-error'
import { ADMIN_ALREADY_EXISTS_ERROR } from 'messages/error/admin/admin-error-message'

export class AdminAlreadyExistsError extends DomainError {
  constructor() {
    super(ADMIN_ALREADY_EXISTS_ERROR, ErrorType.CONFLICT)
  }
}
