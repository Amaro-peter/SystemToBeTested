import { ListSupervisorDoctorMessages } from 'messages/schemas/supervisor-doctor/supervisor-doctor-schema-messages'
import z from 'zod'

export const listSupervisorDoctorSchema = z.object({
  page: z.coerce
    .number({ message: ListSupervisorDoctorMessages.page.invalid })
    .int({ message: ListSupervisorDoctorMessages.page.invalid })
    .positive({ message: ListSupervisorDoctorMessages.page.min })
    .default(1),
  pageSize: z.coerce
    .number({ message: ListSupervisorDoctorMessages.pageSize.invalid })
    .int({ message: ListSupervisorDoctorMessages.pageSize.invalid })
    .positive({ message: ListSupervisorDoctorMessages.pageSize.min }),
})

export type ListSupervisorDoctorSchemaType = z.infer<typeof listSupervisorDoctorSchema>
