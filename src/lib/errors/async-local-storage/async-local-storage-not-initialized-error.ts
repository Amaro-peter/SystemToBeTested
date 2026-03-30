import { ErrorType } from '@core/types/error-type'
import { SystemError } from 'errors/system-error'
import { ASYNC_LOCAL_STORAGE_NOT_INITIALIZED_ERROR } from 'messages/error/system/async-local-storage'

export class AsyncLocalStorageNotInitializedError extends SystemError {
  constructor() {
    super(ASYNC_LOCAL_STORAGE_NOT_INITIALIZED_ERROR, ErrorType.INTERNAL_SERVER_ERROR)
  }
}
