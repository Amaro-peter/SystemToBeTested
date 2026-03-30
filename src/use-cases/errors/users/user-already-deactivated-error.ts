import { ErrorType } from '@core/types/error-type'
import { DomainError } from 'errors/domain-error'
import { USER_IS_DEACTIVATED } from 'messages/error/user/user-error-messages'

export class UserAlreadyDeactivatedError extends DomainError {
  constructor() {
    super(USER_IS_DEACTIVATED, ErrorType.CONFLICT)
  }
}
