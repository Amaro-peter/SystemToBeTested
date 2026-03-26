import { HTTPDomainError } from 'errors/http/http-domain-error'
import { ADMIN_NOT_FOUND_ERROR } from 'messages/error/admin/admin-error-message'

export class AdminNotFoundError extends HTTPDomainError {
  constructor() {
    super(ADMIN_NOT_FOUND_ERROR, 404)
  }
}
