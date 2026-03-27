import z from 'zod'
import { SearchUsersMessages } from 'messages/schemas/users/user-schema-messages'

export const searchUsersSchema = z.object({
  name: z
    .string({
      message: SearchUsersMessages.name.invalid,
    })
    .optional(),
  email: z
    .string({
      message: SearchUsersMessages.email.invalid,
    })
    .optional(),
  cpf: z
    .string({
      message: SearchUsersMessages.cpf.invalid,
    })
    .optional(),
  isActive: z
    .boolean({
      message: SearchUsersMessages.isActive.invalid,
    })
    .optional(),
  page: z
    .number({
      message: SearchUsersMessages.page.invalid,
    })
    .min(1, SearchUsersMessages.page.min)
    .default(1),
  pageSize: z
    .number({
      message: SearchUsersMessages.pageSize.invalid,
    })
    .min(1, SearchUsersMessages.pageSize.min),
})

export type SearchUsersSchema = z.infer<typeof searchUsersSchema>
