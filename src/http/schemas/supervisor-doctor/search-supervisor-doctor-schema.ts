import { crmSchema } from '@use-cases/user-profiles/supervisor-doctor/schemas/utils/crm'
import { crmUfSchema } from '@use-cases/user-profiles/supervisor-doctor/schemas/utils/crm-uf'
import { statusCrmSchema } from '@use-cases/user-profiles/supervisor-doctor/schemas/utils/status-crm-schema'
import { tipoCrmSchema } from '@use-cases/user-profiles/supervisor-doctor/schemas/utils/tipo-crm'
import { SearchSupervisorDoctorMessages } from 'messages/schemas/supervisor-doctor/supervisor-doctor-schema-messages'
import z from 'zod'

export const searchSupervisorDoctorByNameSchema = z.object({
  name: z
    .string({
      message: SearchSupervisorDoctorMessages.name.invalid,
    })
    .optional(),
  crm: crmSchema.optional(),
  status: statusCrmSchema.optional(),
  crmUf: crmUfSchema.optional(),
  tipoCrm: tipoCrmSchema.optional(),
  page: z
    .number({
      message: SearchSupervisorDoctorMessages.page.invalid,
    })
    .min(1, SearchSupervisorDoctorMessages.page.min)
    .default(1),
  pageSize: z
    .number({
      message: SearchSupervisorDoctorMessages.pageSize.invalid,
    })
    .min(1, SearchSupervisorDoctorMessages.pageSize.min),
})

export type SearchSupervisorDoctorByNameSchema = z.infer<typeof searchSupervisorDoctorByNameSchema>
