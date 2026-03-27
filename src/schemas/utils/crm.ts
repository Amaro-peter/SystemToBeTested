import z from 'zod'
import { SupervisorDoctorSchemaMessages } from 'messages/schemas/supervisor-doctor/supervisor-doctor-schema-messages'

export const crmSchema = z
  .string({ message: SupervisorDoctorSchemaMessages.crm.required })
  .trim()
  .min(4, SupervisorDoctorSchemaMessages.crm.minLength)
  .max(6, SupervisorDoctorSchemaMessages.crm.maxLength)
  .regex(/^\d+$/, SupervisorDoctorSchemaMessages.crm.invalid)
