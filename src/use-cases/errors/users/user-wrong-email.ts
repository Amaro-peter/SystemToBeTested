import { ErrorType } from '@core/types/error-type'
import { DomainError } from 'errors/domain-error'
import { USER_WRONG_EMAIL_ERROR } from 'messages/error/user/user-error-messages'

export class UserWrongEmailError extends DomainError {
  constructor() {
    super(USER_WRONG_EMAIL_ERROR, ErrorType.UNAUTHORIZED)
  }
}
