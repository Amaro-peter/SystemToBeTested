import { SupervisorDoctorSchemaMessages } from 'messages/schemas/supervisor-doctor/supervisor-doctor-schema-messages'
import z from 'zod'

export const crmSchema = z
  .string({ message: SupervisorDoctorSchemaMessages.crm.required })
  .trim()
  .min(4, SupervisorDoctorSchemaMessages.crm.minLength)
  .max(6, SupervisorDoctorSchemaMessages.crm.maxLength)
  .regex(/^\d+$/, SupervisorDoctorSchemaMessages.crm.invalid)
