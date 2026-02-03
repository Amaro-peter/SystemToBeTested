import z from 'zod'
import { crmSchema } from '../utils/crm'

export const supervisorDoctorPayloadSchema = z.object({
  crm: crmSchema,
})
