import { HTTPDomainError } from 'errors/http/http-domain-error'
import { USER_ALREADY_EXISTS_ERROR } from 'messages/error/user/user-error-messages'

export class UserAlreadyExistsError extends HTTPDomainError {
  constructor() {
    super(USER_ALREADY_EXISTS_ERROR, 409)
  }
}
