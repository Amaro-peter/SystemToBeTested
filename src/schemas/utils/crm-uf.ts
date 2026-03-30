import { UF } from '@prisma/client'
import z from 'zod'
import { SupervisorDoctorSchemaMessages } from 'messages/schemas/supervisor-doctor/supervisor-doctor-schema-messages'

export const crmUfSchema = z.enum(Object.values(UF), {
  message: SupervisorDoctorSchemaMessages.crmUf.invalid,
})
