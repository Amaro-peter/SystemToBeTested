import { HTTPDomainError } from 'errors/http/http-domain-error'
import { USER_OPERATION_FAILED_ERROR } from 'messages/error/user/user-error-messages'

export class UserOperationFailedError extends HTTPDomainError {
  constructor() {
    super(USER_OPERATION_FAILED_ERROR, 422)
  }
}
