import { cpfSchema } from 'schemas/utils/cpf'
import { emailSchema } from 'schemas/utils/email'
import { passwordSchema } from 'schemas/utils/password'
import { phoneNumberSchema } from 'schemas/utils/phone-number-schema'
import { userRoleSchema } from 'schemas/utils/role-schema'
import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().trim().min(4).max(255),
  email: emailSchema,
  cpf: cpfSchema,
  phoneNumber: phoneNumberSchema,
  role: userRoleSchema,
  password: passwordSchema,
  specificData: z.record(z.string(), z.any()).default({}),
})

export type registerSchemaType = z.infer<typeof registerSchema>
