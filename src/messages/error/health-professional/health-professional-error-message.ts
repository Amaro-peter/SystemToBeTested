import { IErrorDetail } from '@tps/error-interfaces/error-detail.interface'

export const INSTRUCTOR_ALREADY_EXISTS_ERROR: IErrorDetail = {
  code: 'INSTRUCTOR_ALREADY_EXISTS',
  message: 'Já existe um instrutor cadastrado com este CPF',
}

export const INSTRUCTOR_NOT_FOUND_ERROR: IErrorDetail = {
  code: 'INSTRUCTOR_NOT_FOUND',
  message: 'Instrutor não encontrado!',
}

export const INSTRUCTOR_COULD_NOT_BE_CREATED_ERROR: IErrorDetail = {
  code: 'INSTRUCTOR_COULD_NOT_BE_CREATED',
  message: 'Não foi possível criar o instrutor!',
}

export const INSTRUCTOR_OPERATION_FAILED_ERROR: IErrorDetail = {
  code: 'INSTRUCTOR_OPERATION_FAILED',
  message:
    'Não foi possível concluir a operação. Verifique se todos os dados relacionados estão corretos e tente novamente.',
}
