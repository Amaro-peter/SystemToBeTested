import { HTTPDomainError } from '@http/errors/http-domain-error'
import { USER_IS_DEACTIVATED } from 'messages/error/user/user-error-messages'

export class UserAlreadyDeactivatedError extends HTTPDomainError {
  constructor() {
    super(USER_IS_DEACTIVATED, 409)
  }
}
