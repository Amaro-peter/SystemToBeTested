import { HTTPDomainError } from '@http/errors/http-domain-error'
import { USER_NOT_FOUND_ERROR } from 'messages/responses/user-responses.ts/user-api-responses'

export class UserNotFoundError extends HTTPDomainError {
  constructor() {
    super(USER_NOT_FOUND_ERROR, 404)
  }
}
