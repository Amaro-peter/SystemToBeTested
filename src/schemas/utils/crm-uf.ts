import { UF } from '@prisma/client'
import { SupervisorDoctorSchemaMessages } from 'messages/schemas/supervisor-doctor/supervisor-doctor-schema-messages'
import z from 'zod'

export const crmUfSchema = z.enum(Object.values(UF), {
  message: SupervisorDoctorSchemaMessages.crmUf.invalid,
})
