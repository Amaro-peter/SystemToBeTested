import { messages } from '@constants/messages'

export class SupervisorDoctorAlreadyExistsError extends Error {
  constructor() {
    super(messages.validation.superVisorDoctorAlreadyExists)
  }
}
