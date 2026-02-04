import { messages } from '@constants/messages'
import { DomainError } from '@core/domain/errors/domain-error'

export class UserCouldNotBeUpdatedError extends DomainError {
  constructor() {
    super(messages.errors.userCouldNotBeUpdated)
  }
}
