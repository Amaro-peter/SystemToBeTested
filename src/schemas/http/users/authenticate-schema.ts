import { emailSchema } from 'schemas/utils/email'
import { z } from 'zod'

export const authenticateSchema = z.object({
  login: emailSchema,
  password: z.string().trim().min(4),
})

export type AuthenticateSchemaType = z.infer<typeof authenticateSchema>
