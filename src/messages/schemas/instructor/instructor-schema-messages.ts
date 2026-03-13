export const InstructorSchemaMessages = {
  registration: {
    required: 'O registro profissional é obrigatório',
    minLength: 'O registro profissional deve ter no mínimo 4 caracteres',
    maxLength: 'O registro profissional deve ter no máximo 20 caracteres',
  },
  speciality: {
    invalid: 'Especialidade inválida. Deve ser TECNICO_DE_ENFERMAGEM ou EDUCADOR_FISICO.',
  },
} as const

export const SearchInstructorMessages = {
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

export const ListInstructorMessages = {
  page: {
    min: 'A página deve ser no mínimo 1',
    invalid: 'A página deve ser um número inteiro válido',
  },
  pageSize: {
    min: 'O tamanho da página deve ser no mínimo 1',
    invalid: 'O tamanho da página deve ser um número inteiro válido',
  },
} as const
