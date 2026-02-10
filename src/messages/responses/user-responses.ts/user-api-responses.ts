import { IErrorDetail } from '@tps/error-interfaces/error-detail.interface'

export const USER_ALREADY_EXISTS_ERROR: IErrorDetail = {
  code: 'USER_ALREADY_EXISTS',
  message: 'Já existe um usuário cadastrado com este e-mail ou CPF',
}

export const USER_NOT_FOUND_ERROR: IErrorDetail = {
  code: 'USER_NOT_FOUND',
  message: 'Usuário não encontrado!',
}

export const USER_COULD_NOT_BE_CREATED_ERROR: IErrorDetail = {
  code: 'USER_COULD_NOT_BE_CREATED',
  message: 'Não foi possível criar o usuário!',
}

export const USER_COULD_NOT_BE_UPDATED_ERROR: IErrorDetail = {
  code: 'USER_COULD_NOT_BE_UPDATED',
  message: 'Não foi possível atualizar o usuário!',
}

export const USER_IS_DEACTIVATED: IErrorDetail = {
  code: 'USER_ALREADY_DEACTIVATED',
  message: 'Usuário está desativado!',
}
