import z from 'zod'
import { SupervisorDoctorSchemaMessages } from 'messages/schemas/supervisor-doctor/supervisor-doctor-schema-messages'
import { crmSchema } from '../../../utils/crm'
import { crmUfSchema } from '../../../utils/crm-uf'
import { statusCrmSchema } from '../../../utils/status-crm-schema'

export const updateSupervisorDoctorPayloadSchema = z
  .object({
    crm: crmSchema.optional(),
    crmUf: crmUfSchema.optional(),
    status: statusCrmSchema.optional(),
    dataRegistro: z.coerce
      .date({ message: SupervisorDoctorSchemaMessages.dataRegistro.required })
      .max(new Date(), { message: SupervisorDoctorSchemaMessages.dataRegistro.futureDate })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.crmUf && !data.crm) {
      ctx.addIssue({
        code: 'custom',
        message: SupervisorDoctorSchemaMessages.crmUf.requiredWithoutCrm,
        path: ['crm'],
      })
    }
  })

export type UpdateSupervisorDoctorPayloadType = z.infer<typeof updateSupervisorDoctorPayloadSchema>
