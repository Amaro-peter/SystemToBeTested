import { messages } from '@constants/messages'

export class SupervisorDoctorCouldNotBeCreatedError extends Error {
  constructor() {
    super(messages.errors.supervisorDoctorCouldNotBeCreated)
  }
}
