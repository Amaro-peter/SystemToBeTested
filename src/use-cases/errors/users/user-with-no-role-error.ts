import { HTTPSystemError } from '@http/errors/http-system-error'
import { USER_WITH_NO_ROLE_ERROR } from 'messages/error/user/user-error-messages'

export class UserWithNoRoleError extends HTTPSystemError {
  constructor() {
    super(USER_WITH_NO_ROLE_ERROR, 500)
  }
}
