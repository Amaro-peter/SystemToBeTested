import { messages } from '@constants/messages'
import { DomainError } from '@core/domain/errors/domain-error'

export class UserCouldNotBeCreatedError extends DomainError {
  constructor() {
    super(messages.errors.userCouldNotBeCreated)
  }
}
