import { messages } from '@constants/messages'

export class UserWithNoRoleError extends Error {
  constructor() {
    super(messages.validation.invalidRole)
  }
}
