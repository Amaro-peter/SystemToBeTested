import { ISystemResponse } from '@tps/responses/system-response'

export class SystemError extends Error {
  public body: ISystemResponse

  constructor(error: ISystemResponse) {
    super(error.message)

    this.name = this.constructor.name
    this.body = error
  }
}
