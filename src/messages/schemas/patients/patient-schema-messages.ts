export const RegisterPatientSchemaMessages = {
  birthDate: {
    required: 'Data de nascimento é obrigatória',
  },
  optionalField: {
    invalid: 'Campo opcional deve ser um texto válido ou nulo',
  },
  gender: {
    required: 'Gênero é obrigatório',
  },
  riskLevel: {
    required: 'Nível de risco é obrigatório',
  },
} as const
