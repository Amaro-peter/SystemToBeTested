import { IErrorDetail } from '@tps/error-interfaces/error-detail.interface'

export const ADMIN_ALREADY_EXISTS_ERROR: IErrorDetail = {
  code: 'ADMIN_ALREADY_EXISTS',
  message: 'Já existe um administrador cadastrado com este CPF',
}

export const ADMIN_NOT_FOUND_ERROR: IErrorDetail = {
  code: 'ADMIN_NOT_FOUND',
  message: 'Administrador não encontrado!',
}

export const ADMIN_COULD_NOT_BE_CREATED_ERROR: IErrorDetail = {
  code: 'ADMIN_COULD_NOT_BE_CREATED',
  message: 'Não foi possível criar o administrador!',
}

export const ADMIN_OPERATION_FAILED_ERROR: IErrorDetail = {
  code: 'ADMIN_OPERATION_FAILED',
  message:
    'Não foi possível concluir a operação. Verifique se todos os dados relacionados estão corretos e tente novamente.',
}
