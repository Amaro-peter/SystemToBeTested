import { ErrorType } from '@core/types/error-type'
import { IErrorDetail } from './error-detail.interface'

export interface IAppError extends Error {
  readonly type: ErrorType

  readonly body: IErrorDetail
}
