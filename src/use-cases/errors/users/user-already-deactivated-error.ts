import { HTTPDomainError } from '@http/errors/http-domain-error'
import { USER_IS_DEACTIVATED } from 'messages/responses/user-responses.ts/user-api-responses'

export class UserAlreadyDeactivatedError extends HTTPDomainError {
  constructor() {
    super(USER_IS_DEACTIVATED, 409)
  }
}
