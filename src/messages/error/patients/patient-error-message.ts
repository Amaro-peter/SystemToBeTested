import { IErrorDetail } from '@tps/error-interfaces/error-detail.interface'

export const PATIENT_ALREADY_EXISTS_ERROR: IErrorDetail = {
  code: 'PATIENT_ALREADY_EXISTS',
  message: 'Já existe um paciente cadastrado com este CPF',
}

export const PATIENT_NOT_FOUND_ERROR: IErrorDetail = {
  code: 'PATIENT_NOT_FOUND',
  message: 'Paciente não encontrado!',
}

export const PATIENT_COULD_NOT_BE_CREATED_ERROR: IErrorDetail = {
  code: 'PATIENT_COULD_NOT_BE_CREATED',
  message: 'Não foi possível criar o paciente!',
}

export const PATIENT_OPERATION_FAILED_ERROR: IErrorDetail = {
  code: 'PATIENT_OPERATION_FAILED',
  message:
    'Não foi possível concluir a operação. Verifique se todos os dados relacionados estão corretos e tente novamente.',
}
