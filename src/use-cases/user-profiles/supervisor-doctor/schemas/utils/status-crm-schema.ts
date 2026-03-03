import { DoctorStatus } from '@prisma/client'
import { SupervisorDoctorSchemaMessages } from 'messages/schemas/supervisor-doctor/supervisor-doctor-schema-messages'
import z from 'zod'

export const statusCrmSchema = z.enum(Object.values(DoctorStatus), {
  message: SupervisorDoctorSchemaMessages.status.invalid,
})
