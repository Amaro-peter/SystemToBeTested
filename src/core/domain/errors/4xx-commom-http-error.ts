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

// 422 - Unprocessable Entity
export abstract class DomainUnprocessableEntityError extends DomainError {
  constructor(message: string) {
    super(message, 422)
  }
}
