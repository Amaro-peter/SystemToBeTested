import { IErrorDetail } from '@core/contracts/errors/error-detail.interface'

export const SUPERVISOR_DOCTOR_ALREADY_EXISTS_ERROR: IErrorDetail = {
  code: 'SUPERVISOR_DOCTOR_ALREADY_EXISTS',
  message: 'Já existe um usuário Supervisor Médico cadastrado com este CRM',
}

export const SUPERVISOR_DOCTOR_NOT_FOUND_ERROR: IErrorDetail = {
  code: 'SUPERVISOR_DOCTOR_NOT_FOUND',
  message: 'Usuário Supervisor Médico não encontrado!',
}

export const SUPERVISOR_DOCTOR_COULD_NOT_BE_CREATED_ERROR: IErrorDetail = {
  code: 'SUPERVISOR_DOCTOR_COULD_NOT_BE_CREATED',
  message: 'Não foi possível criar o usuário Supervisor Médico!',
}

export const SUPERVISOR_DOCTOR_OPERATION_FAILED_ERROR: IErrorDetail = {
  code: 'SUPERVISOR_DOCTOR_OPERATION_FAILED',
  message:
    'Não foi possível concluir a operação. Verifique se todos os dados relacionados estão corretos e tente novamente.',
}
