import { IErrorDetail } from '@core/contracts/errors/error-detail.interface'

export const USER_ALREADY_EXISTS_ERROR: IErrorDetail = {
  code: 'USER_ALREADY_EXISTS',
  message: 'Já existe um usuário cadastrado com este e-mail ou CPF',
}

export const USER_NOT_FOUND_ERROR: IErrorDetail = {
  code: 'USER_NOT_FOUND',
  message: 'Usuário não encontrado! Verifique o e-mail ou CPF e tente novamente.',
}

export const USER_COULD_NOT_BE_CREATED_ERROR: IErrorDetail = {
  code: 'USER_COULD_NOT_BE_CREATED',
  message: 'Não foi possível criar o usuário!',
}

export const USER_OPERATION_FAILED_ERROR: IErrorDetail = {
  code: 'USER_OPERATION_FAILED',
  message: 'Não foi possível realizar a operação com o usuário!',
}

export const USER_IS_DEACTIVATED: IErrorDetail = {
  code: 'USER_ALREADY_DEACTIVATED',
  message: 'Usuário está desativado!',
}

export const USER_WITH_NO_ROLE_ERROR: IErrorDetail = {
  code: 'USER_WITH_NO_ROLE',
  message: 'Usuário não possui uma função atribuída',
}

export const USER_WRONG_PASSWORD_ERROR: IErrorDetail = {
  code: 'USER_WRONG_PASSWORD',
  message: 'A senha está incorreta',
}

export const USER_WRONG_EMAIL_ERROR: IErrorDetail = {
  code: 'USER_WRONG_EMAIL',
  message: 'O e-mail está incorreto',
}

export const USER_UNSUPPORTED_ROLE_ERROR: IErrorDetail = {
  code: 'USER_UNSUPPORTED_ROLE',
  message: 'Função do usuário não é suportada.',
}
