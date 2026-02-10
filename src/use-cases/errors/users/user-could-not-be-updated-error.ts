import { HTTPDomainError } from '@http/errors/http-domain-error'
import { USER_COULD_NOT_BE_UPDATED_ERROR } from 'messages/responses/user-responses.ts/user-api-responses'

export class UserCouldNotBeUpdatedError extends HTTPDomainError {
  constructor() {
    super(USER_COULD_NOT_BE_UPDATED_ERROR, 422)
  }
}
