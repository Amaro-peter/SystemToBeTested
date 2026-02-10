import { HTTPDomainError } from '@http/errors/http-domain-error'
import { USER_ALREADY_EXISTS_ERROR } from 'messages/responses/user-responses.ts/user-api-responses'

export class UserAlreadyExistsError extends HTTPDomainError {
  constructor() {
    super(USER_ALREADY_EXISTS_ERROR, 409)
  }
}
