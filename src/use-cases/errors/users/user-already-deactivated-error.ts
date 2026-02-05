import { messages } from "@constants/messages";
import { DomainConflictError } from "@core/domain/errors/4xx-commom-http-error";


export class UserAlreadyDeactivatedError extends DomainConflictError {
  constructor() {
    super(messages.validation.userAlreadyDeactivated)
  }
}
