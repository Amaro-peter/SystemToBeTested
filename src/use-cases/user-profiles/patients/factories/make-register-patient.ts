import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaHTTPErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { ZodValidator } from '@lib/validation/zod-validator'
import { PrismaPatientRepository } from '@repositories/prisma/prisma-patient'
import { patientHTTPErrorMapping } from '@use-cases/errors/patients/patient-error-mapper'
import { registerPatientPayloadSchema } from '../../../../schemas/use-cases/user-profiles/patients/register-patient-schema'
import { RegisterPatientStrategy } from '../strategies/register-patient-strategy'

export function makeRegisterPatientStrategy(dbContext: DatabaseContext) {
  const errorMapper = new PrismaHTTPErrorMapper(patientHTTPErrorMapping)
  const patientRepository = new PrismaPatientRepository(dbContext, errorMapper)
  const validator = new ZodValidator(registerPatientPayloadSchema)

  return new RegisterPatientStrategy(patientRepository, validator)
}
