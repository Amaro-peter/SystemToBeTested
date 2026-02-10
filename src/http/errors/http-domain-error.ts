import { IErrorDetail } from '@tps/error-interfaces/error-detail.interface'
import { BaseError } from 'errors/base-error'

// Abstract class for future http domain errors implementations.

export abstract class HTTPDomainError extends BaseError {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(detail: IErrorDetail, statusCode: number) {
    super(detail, statusCode)
  }
}
