import { cpf } from 'cpf-cnpj-validator'
import { z } from 'zod'
import { messages } from '@constants/messages'

export const cpfSchema = z.preprocess(
  (val) => (typeof val === 'string' ? val.replace(/\D/g, '') : val),
  z.string().refine(cpf.isValid, { message: messages.validation.invalidCpf }).transform(cpf.format),
)
