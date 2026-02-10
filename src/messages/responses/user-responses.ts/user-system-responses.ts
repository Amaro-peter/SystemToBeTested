import { IErrorDetail } from '@tps/error-interfaces/error-detail.interface'

export const USER_WITH_NO_ROLE_ERROR: IErrorDetail = {
  code: 'USER_WITH_NO_ROLE',
  message: 'Usuário não possui uma função atribuída',
}
