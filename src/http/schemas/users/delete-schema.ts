import { z } from 'zod'
import { userRoleSchema } from '../utils/role-schema'

export const deleteSchema = z.object({
  role: userRoleSchema,
})

export type deleteSchemaType = z.infer<typeof deleteSchema>
