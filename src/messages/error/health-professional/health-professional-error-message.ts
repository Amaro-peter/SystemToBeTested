import { IErrorDetail } from '@tps/error-interfaces/error-detail.interface'

export const HEALTH_PROFESSIONAL_ALREADY_EXISTS_ERROR: IErrorDetail = {
  code: 'HEALTH_PROFESSIONAL_ALREADY_EXISTS',
  message: 'Já existe um profissional de saúde cadastrado com este CPF',
}

export const HEALTH_PROFESSIONAL_NOT_FOUND_ERROR: IErrorDetail = {
  code: 'HEALTH_PROFESSIONAL_NOT_FOUND',
  message: 'Profissional de saúde não encontrado!',
}

export const HEALTH_PROFESSIONAL_COULD_NOT_BE_CREATED_ERROR: IErrorDetail = {
  code: 'HEALTH_PROFESSIONAL_COULD_NOT_BE_CREATED',
  message: 'Não foi possível criar o profissional de saúde!',
}

export const HEALTH_PROFESSIONAL_OPERATION_FAILED_ERROR: IErrorDetail = {
  code: 'HEALTH_PROFESSIONAL_OPERATION_FAILED',
  message:
    'Não foi possível concluir a operação. Verifique se todos os dados relacionados estão corretos e tente novamente.',
}
