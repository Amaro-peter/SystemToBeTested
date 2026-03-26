import { HTTPSystemError } from 'errors/http/http-system-error'
import { ASYNC_LOCAL_STORAGE_NOT_INITIALIZED_ERROR } from 'messages/error/system/async-local-storage'

export class AsyncLocalStorageNotInitializedError extends HTTPSystemError {
  constructor() {
    super(ASYNC_LOCAL_STORAGE_NOT_INITIALIZED_ERROR, 500)
  }
}
