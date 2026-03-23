import { ListUserSchemaMessages } from 'messages/schemas/users/user-schema-messages'
import z from 'zod'

export const listUsersSchema = z.object({
  page: z.coerce
    .number({ message: ListUserSchemaMessages.page.invalid })
    .int({ message: ListUserSchemaMessages.page.invalid })
    .positive({ message: ListUserSchemaMessages.page.min })
    .default(1),
  pageSize: z.coerce
    .number({ message: ListUserSchemaMessages.pageSize.invalid })
    .int({ message: ListUserSchemaMessages.pageSize.invalid })
    .positive({ message: ListUserSchemaMessages.pageSize.min }),
})

export type ListUsersSchemaType = z.infer<typeof listUsersSchema>
