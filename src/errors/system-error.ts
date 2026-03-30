import { IErrorDetail } from '@core/contracts/errors/error-detail.interface'
import { ErrorType } from '@core/types/error-type'
import { AppError } from 'errors/app-error'

// Abstract class for system errors implementations.
export abstract class SystemError extends AppError {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(detail: IErrorDetail, type: ErrorType) {
    super(detail, type)
  }
}
