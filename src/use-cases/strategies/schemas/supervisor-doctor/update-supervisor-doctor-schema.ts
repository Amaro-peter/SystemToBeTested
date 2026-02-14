import { DoctorStatus, TipoCRM, UF } from '@prisma/client'
import z from 'zod'
import { crmSchema } from '../utils/crm'

export const updateSupervisorDoctorPayloadSchema = z
  .object({
    crm: crmSchema.optional(),

    crmUf: z
      .enum(Object.values(UF), {
        message: 'Unidade Federativa inválida.',
      })
      .optional(),

    tipoCrm: z
      .enum(Object.values(TipoCRM), {
        message: 'Tipo de CRM inválido. Deve ser PROVISORIO, DEFINITIVO ou ESTRANGEIRO.',
      })
      .optional(),

    status: z
      .enum(Object.values(DoctorStatus), {
        message: 'Status inválido. Deve ser ATIVO, INATIVO ou SUSPENSO.',
      })
      .optional(),

    dataRegistro: z.coerce
      .date({ message: 'Data de registro é obrigatória' })
      .max(new Date(), { message: 'Data de registro não pode ser futura' })
      .optional(),

    dataValidade: z.coerce.date().optional(),
  })
  .superRefine((data, ctx) => {
    const isProvisorio = data.tipoCrm === TipoCRM.PROVISORIO
    const hasValidade = data.dataValidade !== undefined && data.dataValidade !== null

    if (isProvisorio && !hasValidade) {
      ctx.addIssue({
        code: 'custom',
        message: 'A data de validade é obrigatória para registros com tipo de CRM PROVISÓRIO',
        path: ['dataValidade'],
      })
    }

    if (!isProvisorio && hasValidade) {
      ctx.addIssue({
        code: 'custom',
        message: `A data de validade não deve ser preenchida para o tipo de CRM ${data.tipoCrm}`,
        path: ['dataValidade'],
      })
    }

    if (hasValidade && data.dataRegistro) {
      if (data.dataValidade && data.dataValidade <= data.dataRegistro) {
        ctx.addIssue({
          code: 'custom',
          message: 'A data de validade deve ser posterior à data de registro',
          path: ['dataValidade'],
        })
      }
    }

    if (data.crm && !data.crmUf) {
      ctx.addIssue({
        code: 'custom',
        message: 'A UF do CRM é obrigatória quando o CRM é fornecido',
        path: ['crmUf'],
      })
    }
  })

export type UpdateSupervisorDoctorPayloadType = z.infer<typeof updateSupervisorDoctorPayloadSchema>
