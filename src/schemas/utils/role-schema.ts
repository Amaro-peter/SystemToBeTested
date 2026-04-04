import { z } from 'zod'
import { messages } from '@core/constants/messages'
import { EnumUserRole } from '@core/contracts/repositories/users-repository.interface'

export const userRoleSchema = z.enum(Object.values(EnumUserRole), {
  message: messages.validation.invalidRole,
})
