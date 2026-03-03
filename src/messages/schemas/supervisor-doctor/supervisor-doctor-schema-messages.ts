export const SupervisorDoctorSchemaMessages = {
  crm: {
    required: 'O CRM é obrigatório',
    minLength: 'CRM deve ter no mínimo 4 dígitos',
    maxLength: 'CRM deve ter no máximo 6 dígitos',
    invalid: 'CRM inválido! Verifique o valor informado.',
  },
  crmUf: {
    invalid: 'Unidade Federativa inválida.',
    requiredWithCrm: 'A Unidade Federativa é obrigatória quando o CRM é fornecido para atualização.',
    requiredWithoutCrm: 'O CRM é obrigatório quando a Unidade Federativa do CRM é fornecida para atualização.',
  },
  tipoCrm: {
    invalid: 'Tipo de CRM inválido. Deve ser PROVISORIO, DEFINITIVO ou ESTRANGEIRO.',
  },
  status: {
    invalid: 'Status inválido. O status deve ser ATIVO, INATIVO ou SUSPENSO.',
  },
  dataRegistro: {
    required: 'Data de registro é obrigatória',
    futureDate: 'Data de registro não pode ser futura',
  },
  dataValidade: {
    requiredForProvisorio: 'A data de validade é obrigatória para registros com tipo de CRM PROVISÓRIO',
    notAllowedForType: (tipoCrm: string) => `A data de validade não deve ser preenchida para o tipo de CRM ${tipoCrm}`,
    mustBeAfterRegistro: 'A data de validade deve ser posterior à data de registro',
  },
} as const

export const SearchSupervisorDoctorMessages = {
  name: {
    invalid: 'O nome deve ser um texto válido',
  },
  page: {
    min: 'A página deve ser no mínimo 1',
    invalid: 'A página deve ser um número válido',
  },
  pageSize: {
    min: 'O tamanho da página deve ser no mínimo 1',
    invalid: 'O tamanho da página deve ser um número válido',
  },
} as const

export const ListSupervisorDoctorMessages = {
  page: {
    min: 'A página deve ser no mínimo 1',
    invalid: 'A página deve ser um número inteiro válido',
  },
  pageSize: {
    min: 'O tamanho da página deve ser no mínimo 1',
    invalid: 'O tamanho da página deve ser um número inteiro válido',
  },
} as const
