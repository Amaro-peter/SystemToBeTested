import { ErrorType } from '@core/types/error-type'
import { DomainError } from 'errors/domain-error'
import { ADMIN_COULD_NOT_BE_CREATED_ERROR } from 'messages/error/admin/admin-error-message'

export class AdminCouldNotBeCreatedError extends DomainError {
  constructor() {
    super(ADMIN_COULD_NOT_BE_CREATED_ERROR, ErrorType.BAD_REQUEST)
  }
}
