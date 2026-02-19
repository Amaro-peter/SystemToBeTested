import { messages } from '@constants/messages'
import z from 'zod'

export const crmSchema = z
  .string({ message: 'O CRM é obrigatório' })
  .trim()
  .min(4, 'CRM deve ter no mínimo 4 dígitos')
  .max(6, 'CRM deve ter no máximo 6 dígitos')
  .regex(/^\d+$/, messages.validation.invalidCRM)
