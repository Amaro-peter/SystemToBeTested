import { messages } from '@core/constants/messages'
import { cpf } from 'cpf-cnpj-validator'
import { z } from 'zod'

export const cpfSchema = z.preprocess(
  (val) => (typeof val === 'string' ? val.replace(/\D/g, '') : val),
  z.string().refine(cpf.isValid, { message: messages.validation.invalidCpf }).transform(cpf.format),
)
