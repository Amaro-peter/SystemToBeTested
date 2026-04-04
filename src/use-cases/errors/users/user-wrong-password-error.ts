import { ErrorType } from '@core/types/error-type'
import { DomainError } from 'errors/domain-error'
import { USER_WRONG_PASSWORD_ERROR } from 'messages/error/user/user-error-messages'

export class UserWithWrongPasswordError extends DomainError {
  constructor() {
    super(USER_WRONG_PASSWORD_ERROR, ErrorType.UNAUTHORIZED)
  }
}
