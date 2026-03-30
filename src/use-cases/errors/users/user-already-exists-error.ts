import { ErrorType } from '@core/types/error-type'
import { DomainError } from 'errors/domain-error'
import { USER_ALREADY_EXISTS_ERROR } from 'messages/error/user/user-error-messages'

export class UserAlreadyExistsError extends DomainError {
  constructor() {
    super(USER_ALREADY_EXISTS_ERROR, ErrorType.CONFLICT)
  }
}
