import { IErrorDetail } from '@tps/error-interfaces/error-detail.interface'

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

export const SUPERVISOR_DOCTOR_COULD_NOT_BE_UPDATED_ERROR: IErrorDetail = {
  code: 'SUPERVISOR_DOCTOR_COULD_NOT_BE_UPDATED',
  message: 'Não foi possível atualizar o usuário Supervisor Médico!',
}
