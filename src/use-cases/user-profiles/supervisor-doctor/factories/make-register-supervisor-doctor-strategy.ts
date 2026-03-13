import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { ZodValidator } from '@lib/validation/zod-validator'
import { PrismaSupervisorDoctorRepository } from '@repositories/prisma/prisma-supervisor-doctor'
import { supervisorDoctorErrorMapping } from '@use-cases/errors/supervisor-doctor/supervisor-doctor-error-mapper'
import { registerSupervisorDoctorPayloadSchema } from '@use-cases/user-profiles/supervisor-doctor/schemas/register-supervisor-doctor-schema'
import { RegisterSupervisorDoctorStrategy } from '@use-cases/user-profiles/supervisor-doctor/strategies/register-supervisor-doctor-strategy'

export function makeRegisterSupervisorDoctorStrategy(dbContext: DatabaseContext) {
  const errorMapper = new PrismaErrorMapper(supervisorDoctorErrorMapping)
  const supervisorDoctorRepository = new PrismaSupervisorDoctorRepository(dbContext, errorMapper)
  const validator = new ZodValidator(registerSupervisorDoctorPayloadSchema)

  return new RegisterSupervisorDoctorStrategy(supervisorDoctorRepository, validator)
}
