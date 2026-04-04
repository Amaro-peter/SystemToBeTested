import { z } from 'zod'
import { cpfSchema } from 'schemas/utils/cpf'
import { emailSchema } from 'schemas/utils/email'
import { passwordSchema } from 'schemas/utils/password'
import { phoneNumberSchema } from 'schemas/utils/phone-number-schema'
import { userRoleSchema } from 'schemas/utils/role-schema'
import { usernameSchema } from 'schemas/utils/username'

export const registerAdminPayloadSchema = z.object({
  name: usernameSchema,
  email: emailSchema,
  cpf: cpfSchema,
  phoneNumber: phoneNumberSchema,
  password: passwordSchema,
  role: userRoleSchema,
})
