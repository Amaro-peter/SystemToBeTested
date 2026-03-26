import { TipoCRM } from '@prisma/client'
import z from 'zod'
import { SupervisorDoctorSchemaMessages } from 'messages/schemas/supervisor-doctor/supervisor-doctor-schema-messages'
import { crmSchema } from '../../../utils/crm'
import { crmUfSchema } from '../../../utils/crm-uf'
import { statusCrmSchema } from '../../../utils/status-crm-schema'
import { tipoCrmSchema } from '../../../utils/tipo-crm'

export const updateSupervisorDoctorPayloadSchema = z
  .object({
    crm: crmSchema.optional(),
    crmUf: crmUfSchema.optional(),
    tipoCrm: tipoCrmSchema.optional(),
    status: statusCrmSchema.optional(),
    dataRegistro: z.coerce
      .date({ message: SupervisorDoctorSchemaMessages.dataRegistro.required })
      .max(new Date(), { message: SupervisorDoctorSchemaMessages.dataRegistro.futureDate })
      .optional(),
    dataValidade: z.coerce.date().optional(),
  })
  .superRefine((data, ctx) => {
    const isProvisorio = data.tipoCrm === TipoCRM.PROVISORIO
    const hasValidade = data.dataValidade !== undefined && data.dataValidade !== null

    if (isProvisorio && !hasValidade) {
      ctx.addIssue({
        code: 'custom',
        message: SupervisorDoctorSchemaMessages.dataValidade.requiredForProvisorio,
        path: ['dataValidade'],
      })
    }

    if (!isProvisorio && hasValidade) {
      ctx.addIssue({
        code: 'custom',
        message: SupervisorDoctorSchemaMessages.dataValidade.notAllowedForType(data.tipoCrm ?? ''),
        path: ['dataValidade'],
      })
    }

    if (hasValidade && data.dataRegistro) {
      if (data.dataValidade && data.dataValidade <= data.dataRegistro) {
        ctx.addIssue({
          code: 'custom',
          message: SupervisorDoctorSchemaMessages.dataValidade.mustBeAfterRegistro,
          path: ['dataValidade'],
        })
      }
    }

    if (data.crm && !data.crmUf) {
      ctx.addIssue({
        code: 'custom',
        message: SupervisorDoctorSchemaMessages.crmUf.requiredWithCrm,
        path: ['crmUf'],
      })
    }

    if (data.crmUf && !data.crm) {
      ctx.addIssue({
        code: 'custom',
        message: SupervisorDoctorSchemaMessages.crmUf.requiredWithoutCrm,
        path: ['crm'],
      })
    }
  })

export type UpdateSupervisorDoctorPayloadType = z.infer<typeof updateSupervisorDoctorPayloadSchema>
