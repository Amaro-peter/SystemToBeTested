import { messages } from '@constants/messages'
import z from 'zod'

export const crmSchema = z.string().length(5, { message: messages.validation.invalidCRM })