import { DoctorStatus } from '@prisma/client'
import z from 'zod'
import { SupervisorDoctorSchemaMessages } from 'messages/schemas/supervisor-doctor/supervisor-doctor-schema-messages'

export const statusCrmSchema = z.enum(Object.values(DoctorStatus), {
  message: SupervisorDoctorSchemaMessages.status.invalid,
})
