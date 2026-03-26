import { TipoCRM } from '@prisma/client'
import z from 'zod'
import { SupervisorDoctorSchemaMessages } from 'messages/schemas/supervisor-doctor/supervisor-doctor-schema-messages'

export const tipoCrmSchema = z.enum(Object.values(TipoCRM), {
  message: SupervisorDoctorSchemaMessages.tipoCrm.invalid,
})
