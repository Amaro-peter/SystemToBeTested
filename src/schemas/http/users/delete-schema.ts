import { userRoleSchema } from 'schemas/utils/role-schema'
import { z } from 'zod'

export const deleteSchema = z.object({
  role: userRoleSchema,
})

export type deleteSchemaType = z.infer<typeof deleteSchema>
