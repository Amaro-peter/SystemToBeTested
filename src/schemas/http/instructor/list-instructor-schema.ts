import z from 'zod'
import { ListInstructorMessages } from 'messages/schemas/instructor/instructor-schema-messages'

export const listInstructorSchema = z.object({
  page: z.coerce
    .number({ message: ListInstructorMessages.page.invalid })
    .int({ message: ListInstructorMessages.page.invalid })
    .positive({ message: ListInstructorMessages.page.min })
    .default(1),
  pageSize: z.coerce
    .number({ message: ListInstructorMessages.pageSize.invalid })
    .int({ message: ListInstructorMessages.pageSize.invalid })
    .positive({ message: ListInstructorMessages.pageSize.min })
    .default(10),
})

export type ListInstructorSchemaType = z.infer<typeof listInstructorSchema>
