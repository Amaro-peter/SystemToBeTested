import { messages } from '@constants/messages'

export class UserCouldNotBeCreatedError extends Error {
  constructor() {
    super(messages.errors.userCouldNotBeCreated)
  }
}
