import { HTTPDomainError } from '@http/errors/http-domain-error'
import { USER_COULD_NOT_BE_CREATED_ERROR } from 'messages/responses/user-responses.ts/user-api-responses'

export class UserCouldNotBeCreatedError extends HTTPDomainError {
  constructor() {
    super(USER_COULD_NOT_BE_CREATED_ERROR, 400)
  }
}
