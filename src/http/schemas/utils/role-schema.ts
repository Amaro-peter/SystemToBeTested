import { messages } from '@constants/messages'
import { UserRole } from '@prisma/client'
import { z } from 'zod'

export const userRoleSchema = z.enum(
    Object.values(UserRole), 
    {
        message: messages.validation.invalidRole,
    }
)
