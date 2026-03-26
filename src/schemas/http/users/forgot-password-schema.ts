import { z } from 'zod'
import { emailSchema } from 'schemas/utils/email'
import { usernameSchema } from 'schemas/utils/username'

export const forgotPasswordSchema = z.object({
  login: z.union([usernameSchema, emailSchema]),
})

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>
