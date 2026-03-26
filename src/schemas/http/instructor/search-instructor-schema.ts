import z from 'zod'
import {
  InstructorSchemaMessages,
  SearchInstructorMessages,
} from 'messages/schemas/instructor/instructor-schema-messages'
import { specialitySchema } from 'schemas/use-cases/user-profiles/instructor/register-instructor-schema'

export const searchInstructorSchema = z.object({
  name: z
    .string({
      message: SearchInstructorMessages.name.invalid,
    })
    .optional(),
  registration: z
    .string({
      message: InstructorSchemaMessages.registration.invalid,
    })
    .trim()
    .min(4, InstructorSchemaMessages.registration.minLength)
    .max(20, InstructorSchemaMessages.registration.maxLength)
    .optional(),
  speciality: specialitySchema.optional(),
  page: z.coerce
    .number({
      message: SearchInstructorMessages.page.invalid,
    })
    .min(1, SearchInstructorMessages.page.min)
    .default(1),
  pageSize: z.coerce
    .number({
      message: SearchInstructorMessages.pageSize.invalid,
    })
    .int({
      message: SearchInstructorMessages.pageSize.invalid,
    })
    .positive({
      message: SearchInstructorMessages.pageSize.min,
    })
    .min(1, SearchInstructorMessages.pageSize.min),
})

export type SearchInstructorSchema = z.infer<typeof searchInstructorSchema>
