import { EnumProfessionalCategory } from '@repositories/instructor-repository.interface'
import { InstructorSchemaMessages } from 'messages/schemas/instructor/instructor-schema-messages'
import z from 'zod'

export const specialitySchema = z.enum(Object.values(EnumProfessionalCategory), {
  message: InstructorSchemaMessages.speciality.invalid,
})

export const registerInstructorPayloadSchema = z.object({
  registration: z
    .string({ message: InstructorSchemaMessages.registration.invalid })
    .trim()
    .min(4, InstructorSchemaMessages.registration.minLength)
    .max(20, InstructorSchemaMessages.registration.maxLength),
  speciality: specialitySchema,
})

export type RegisterInstructorPayload = z.infer<typeof registerInstructorPayloadSchema>
