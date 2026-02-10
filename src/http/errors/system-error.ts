import { IAppError } from '@tps/responses/app.error.interface'
import { ISystemResponse } from '@tps/responses/system-response'

const SYSTEM_ERROR_CODE = 500

export abstract class SystemError extends Error implements IAppError<ISystemResponse> {
  public statusCode: number
  public body: ISystemResponse

  constructor(response: ISystemResponse) {
    super(response.message)

    this.statusCode = response.statusCode || SYSTEM_ERROR_CODE

    this.body = {
      code: response.code,
      message: response.message,
    }
  }

  get status() {
    return this.statusCode
  }
}
