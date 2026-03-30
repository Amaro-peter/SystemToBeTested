export const ListUserSchemaMessages = {
  page: {
    min: 'A página deve ser no mínimo 1',
    invalid: 'A página deve ser um número inteiro válido',
  },
  pageSize: {
    min: 'O tamanho da página deve ser no mínimo 1',
    invalid: 'O tamanho da página deve ser um número inteiro válido',
  },
} as const

export const SearchUsersMessages = {
  name: {
    invalid: 'Name must be a valid string.',
  },
  email: {
    invalid: 'Email must be a valid string.',
  },
  cpf: {
    invalid: 'CPF must be a valid string.',
  },
  isActive: {
    invalid: 'isActive must be a boolean.',
  },
  page: {
    invalid: 'Page must be a number.',
    min: 'Page must be at least 1.',
  },
  pageSize: {
    invalid: 'Page size must be a number.',
    min: 'Page size must be at least 1.',
  },
} as const

export const UpdateUserSchemaMessages = {
  noOp: 'Informe ao menos um campo para atualizar.',
} as const
