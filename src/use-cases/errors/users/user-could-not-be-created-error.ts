import { ErrorType } from '@core/types/error-type'
import { DomainError } from 'errors/domain-error'
import { USER_COULD_NOT_BE_CREATED_ERROR } from 'messages/error/user/user-error-messages'

export class UserCouldNotBeCreatedError extends DomainError {
  constructor() {
    super(USER_COULD_NOT_BE_CREATED_ERROR, ErrorType.BAD_REQUEST)
  }
}
