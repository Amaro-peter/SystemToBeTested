import { z } from 'zod'
import { UpdateUserSchemaMessages } from 'messages/schemas/users/user-schema-messages'
import { cpfSchema } from 'schemas/utils/cpf'
import { emailSchema } from 'schemas/utils/email'
import { phoneNumberSchema } from 'schemas/utils/phone-number-schema'
import { userRoleSchema } from 'schemas/utils/role-schema'

export const updateSchema = z
  .object({
    name: z.string().trim().min(4).optional(),
    email: emailSchema.optional(),
    cpf: cpfSchema.optional(),
    phoneNumber: phoneNumberSchema.optional(),
    specificData: z.record(z.string(), z.any()).optional(),
    role: userRoleSchema,
  })
  .refine(
    (data) => {
      const hasBaseUpdate = [data.name, data.email, data.cpf, data.phoneNumber].some((value) => value !== undefined)
      const hasSpecificData = data.specificData !== undefined && Object.keys(data.specificData).length > 0

      return hasBaseUpdate || hasSpecificData
    },
    {
      message: UpdateUserSchemaMessages.noOp,
    },
  )

export type updateSchemaType = z.infer<typeof updateSchema>
