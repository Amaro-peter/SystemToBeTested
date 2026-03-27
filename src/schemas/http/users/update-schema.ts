import { cpfSchema } from 'schemas/utils/cpf'
import { emailSchema } from 'schemas/utils/email'
import { phoneNumberSchema } from 'schemas/utils/phone-number-schema'
import { userRoleSchema } from 'schemas/utils/role-schema'
import { z } from 'zod'

export const updateSchema = z.object({
  name: z.string().trim().min(4).optional(),
  email: emailSchema.optional(),
  cpf: cpfSchema.optional(),
  phoneNumber: phoneNumberSchema.optional(),
  specificData: z.record(z.string(), z.any()).optional(),
  role: userRoleSchema,
})

export type updateSchemaType = z.infer<typeof updateSchema>
