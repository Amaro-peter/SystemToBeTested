import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { ZodValidator } from '@lib/validation/zod-validator'
import { PrismaPatientRepository } from '@repositories/prisma/prisma-patient'
import { registerPatientPayloadSchema } from '../schemas/register-patient-schema'
import { RegisterPatientStrategy } from '../strategies/register-patient-strategy'

export function makeRegisterPatientStrategy(dbContext: DatabaseContext) {
  const patientRepository = new PrismaPatientRepository(dbContext)
  const validator = new ZodValidator(registerPatientPayloadSchema)

  return new RegisterPatientStrategy(patientRepository, validator)
}
