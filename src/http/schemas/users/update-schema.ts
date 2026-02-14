import { cpfSchema } from '@schemas/utils/cpf'
import { emailSchema } from '@schemas/utils/email'
import { z } from 'zod'
import { phoneNumberSchema } from '../utils/phone-number-schema'
import { userRoleSchema } from '../utils/role-schema'

export const updateSchema = z.object({
  name: z.string().trim().min(4).optional(),
  email: emailSchema.optional(),
  cpf: cpfSchema.optional(),
  phoneNumber: phoneNumberSchema.optional(),
  specificData: z.record(z.string(), z.any()).optional(),
  isActive: z.literal(true).optional(),
  role: userRoleSchema,
})

export type updateSchemaType = z.infer<typeof updateSchema>
