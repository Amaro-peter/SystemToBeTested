import { HTTPDomainError } from 'errors/http/http-domain-error'
import { USER_NOT_FOUND_ERROR } from 'messages/error/user/user-error-messages'

export class UserNotFoundError extends HTTPDomainError {
  constructor() {
    super(USER_NOT_FOUND_ERROR, 404)
  }
}
