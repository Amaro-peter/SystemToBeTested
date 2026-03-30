import { IErrorDetail } from '@core/contracts/errors/error-detail.interface'

export const VALIDATION_ERROR: IErrorDetail = {
  code: 'VALIDATION_ERROR',
  message: 'Dados de registro inválidos!',
}

export const INVALID_JSON_ERROR: IErrorDetail = {
  code: 'INVALID_JSON',
  message: 'JSON inválido fornecido',
}
