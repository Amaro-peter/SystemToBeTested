import { HTTPDomainError } from '@http/errors/http-domain-error'
import { ADMIN_COULD_NOT_BE_CREATED_ERROR } from 'messages/error/admin/admin-error-message'

export class AdminCouldNotBeCreatedError extends HTTPDomainError {
  constructor() {
    super(ADMIN_COULD_NOT_BE_CREATED_ERROR, 400)
  }
}
