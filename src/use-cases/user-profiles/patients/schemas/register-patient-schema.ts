import { Gender, RiskLevel } from '@prisma/client'
import z from 'zod'

export const registerPatientPayloadSchema = z.object({
  birthDate: z.coerce.date({ message: 'Data de nascimento é obrigatória' }),
  medicationsInUse: z.string().optional(),
  assistantDoctorName: z.string().optional(),
  assistantDoctorPhone: z.string().optional(),
  healthInsuranceNumber: z.string().optional(),
  referenceHospital: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  healthInsuranceName: z.string().optional(),

  gender: z.enum(Object.values(Gender), {
    message: 'Gênero é obrigatório ou inválido',
  }),

  riskLevel: z.enum(Object.values(RiskLevel), {
    message: 'Nível de risco é obrigatório ou inválido',
  }),
})
