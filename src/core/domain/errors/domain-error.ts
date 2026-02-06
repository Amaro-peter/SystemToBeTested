export abstract class DomainError extends Error {
  public statusCode: number

  constructor(message: string, statusCode = 400) {
    super(message)
    this.name = 'DomainError'
    this.statusCode = statusCode
  }

  get status() {
    return this.statusCode
  }
}
