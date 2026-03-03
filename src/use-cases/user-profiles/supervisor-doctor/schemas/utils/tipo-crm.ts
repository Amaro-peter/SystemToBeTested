import { TipoCRM } from '@prisma/client'
import { SupervisorDoctorSchemaMessages } from 'messages/schemas/supervisor-doctor/supervisor-doctor-schema-messages'
import z from 'zod'

export const tipoCrmSchema = z.enum(Object.values(TipoCRM), {
  message: SupervisorDoctorSchemaMessages.tipoCrm.invalid,
})
