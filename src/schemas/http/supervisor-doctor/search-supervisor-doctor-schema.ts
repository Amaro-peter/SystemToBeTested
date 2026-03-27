import z from 'zod'
import { SearchSupervisorDoctorMessages } from 'messages/schemas/supervisor-doctor/supervisor-doctor-schema-messages'
import { crmSchema } from 'schemas/utils/crm'
import { crmUfSchema } from 'schemas/utils/crm-uf'
import { statusCrmSchema } from 'schemas/utils/status-crm-schema'

export const searchSupervisorDoctorByNameSchema = z.object({
  name: z
    .string({
      message: SearchSupervisorDoctorMessages.name.invalid,
    })
    .optional(),
  crm: crmSchema.optional(),
  status: statusCrmSchema.optional(),
  crmUf: crmUfSchema.optional(),
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
