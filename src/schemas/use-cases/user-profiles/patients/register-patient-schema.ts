import z from 'zod'
import { EnumGender, EnumRiskLevel } from '@core/contracts/repositories/patient-repository.interface'
import { RegisterPatientSchemaMessages } from 'messages/schemas/patients/patient-schema-messages'
import { cpfSchema } from 'schemas/utils/cpf'
import { emailSchema } from 'schemas/utils/email'
import { passwordSchema } from 'schemas/utils/password'
import { phoneNumberSchema } from 'schemas/utils/phone-number-schema'
import { usernameSchema } from 'schemas/utils/username'

const optionalNullableStringSchema = z
  .string({
    error: RegisterPatientSchemaMessages.optionalField.invalid,
  })
  .nullable()
  .optional()

export const registerPatientPayloadSchema = z.object({
  name: usernameSchema,
  email: emailSchema,
  cpf: cpfSchema,
  phoneNumber: phoneNumberSchema,
  password: passwordSchema,
  birthDate: z.coerce.date({ message: RegisterPatientSchemaMessages.birthDate.required }),
  medicationsInUse: optionalNullableStringSchema,
  assistantDoctorName: optionalNullableStringSchema,
  assistantDoctorPhone: optionalNullableStringSchema,
  healthInsuranceNumber: optionalNullableStringSchema,
  referenceHospital: optionalNullableStringSchema,
  emergencyContactName: optionalNullableStringSchema,
  emergencyContactPhone: optionalNullableStringSchema,
  healthInsuranceName: optionalNullableStringSchema,

  gender: z.enum(Object.values(EnumGender), {
    message: RegisterPatientSchemaMessages.gender.required,
  }),

  riskLevel: z.enum(Object.values(EnumRiskLevel), {
    message: RegisterPatientSchemaMessages.riskLevel.required,
  }),
})
