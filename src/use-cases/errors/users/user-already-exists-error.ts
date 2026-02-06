import { messages } from '@constants/messages'
import { DomainConflictError } from '@core/domain/errors/4xx-commom-http-error'

export class UserAlreadyExistsError extends DomainConflictError {
  constructor() {
    super(messages.validation.userAlreadyExists)
  }
}
