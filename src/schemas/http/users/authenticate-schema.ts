import { z } from 'zod'
import { emailSchema } from 'schemas/utils/email'

export const authenticateSchema = z.object({
  login: emailSchema,
  password: z.string().trim().min(4),
})

export type AuthenticateSchemaType = z.infer<typeof authenticateSchema>
