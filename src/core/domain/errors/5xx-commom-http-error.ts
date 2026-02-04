import { DomainError } from "./domain-error"

// 502 - Bad Gateway (Upstream failure)
export abstract class DomainBadGatewayError extends DomainError {
  constructor(message: string) {
    super(message, 502)
  }
}

// 503 - Service Unavailable
export abstract class DomainServiceUnavailableError extends DomainError {
  constructor(message: string) {
    super(message, 503)
  }
}
