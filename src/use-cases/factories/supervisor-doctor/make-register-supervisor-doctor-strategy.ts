import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { ZodValidator } from '@lib/validation/zod-validator'
import { PrismaSupervisorDoctorRepository } from '@repositories/prisma/prisma-supervisor-doctor'
import { supervisorDoctorErrorMapping } from '@use-cases/errors/supervisor-doctor/supervisor-doctor-error-mapper'
import { registerSupervisorDoctorPayloadSchema } from '@use-cases/strategies/schemas/supervisor-doctor/register-supervisor-doctor-schema'

export function makeRegisterSupervisorDoctorStrategy(dbContext: DatabaseContext) {
  const supervisorDoctorRepository = new PrismaSupervisorDoctorRepository(dbContext)
  const validator = new ZodValidator(registerSupervisorDoctorPayloadSchema)
  const errorMapper = new PrismaErrorMapper(supervisorDoctorErrorMapping)

  return {
    supervisorDoctorRepository,
    validator,
    errorMapper,
  }
}
