import { ErrorType } from '@core/types/error-type'
import { SystemError } from 'errors/system-error'
import { USER_WITH_NO_ROLE_ERROR } from 'messages/error/user/user-error-messages'

export class UserWithNoRoleError extends SystemError {
  constructor() {
    super(USER_WITH_NO_ROLE_ERROR, ErrorType.INTERNAL_SERVER_ERROR)
  }
}
