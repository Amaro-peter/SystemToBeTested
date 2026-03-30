import z from 'zod'
import { SupervisorDoctorSchemaMessages } from 'messages/schemas/supervisor-doctor/supervisor-doctor-schema-messages'
import { crmSchema } from '../../../utils/crm'
import { crmUfSchema } from '../../../utils/crm-uf'
import { statusCrmSchema } from '../../../utils/status-crm-schema'

export const registerSupervisorDoctorPayloadSchema = z
  .object({
    crm: crmSchema,
    crmUf: crmUfSchema,
    status: statusCrmSchema,
    dataRegistro: z.coerce
      .date({ message: SupervisorDoctorSchemaMessages.dataRegistro.required })
      .max(new Date(), { message: SupervisorDoctorSchemaMessages.dataRegistro.futureDate }),
    dataValidade: z.coerce.date().optional(),
  })
  .superRefine(() => {})

export type RegisterSupervisorDoctorPayloadType = z.infer<typeof registerSupervisorDoctorPayloadSchema>
