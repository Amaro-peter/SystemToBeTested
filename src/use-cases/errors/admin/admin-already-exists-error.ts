import { HTTPDomainError } from '@http/errors/http-domain-error'
import { ADMIN_ALREADY_EXISTS_ERROR } from 'messages/error/admin/admin-error-message'

export class AdminAlreadyExistsError extends HTTPDomainError {
  constructor() {
    super(ADMIN_ALREADY_EXISTS_ERROR, 409)
  }
}
