import { DomainError } from "./domain-error"

// 404 - Not Found
export abstract class DomainNotFoundError extends DomainError {
  constructor(message: string) {
    super(message, 404)
  }
}

// 409 - Conflict
export abstract class DomainConflictError extends DomainError {
  constructor(message: string) {
    super(message, 409)
  }
}
