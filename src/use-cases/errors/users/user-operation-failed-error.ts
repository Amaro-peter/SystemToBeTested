import { ErrorType } from '@core/types/error-type'
import { DomainError } from 'errors/domain-error'
import { USER_OPERATION_FAILED_ERROR } from 'messages/error/user/user-error-messages'

export class UserOperationFailedError extends DomainError {
  constructor() {
    super(USER_OPERATION_FAILED_ERROR, ErrorType.UNPROCESSABLE_ENTITY)
  }
}
