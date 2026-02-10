import { IApiResponse } from '@tps/responses/api-response'
import { IAppError } from '@tps/responses/app.error.interface'

const DOMAIN_ERROR_CODE = 400

export abstract class DomainError extends Error implements IAppError<IApiResponse> {
  public statusCode: number
  public body: IApiResponse

  constructor(response: IApiResponse) {
    super(response.message)

    this.statusCode = response.statusCode || DOMAIN_ERROR_CODE

    this.body = {
      code: response.code,
      message: response.message,
    }
  }

  get status() {
    return this.statusCode
  }
}
