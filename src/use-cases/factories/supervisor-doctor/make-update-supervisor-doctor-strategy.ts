import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { ZodValidator } from '@lib/validation/zod-validator'
import { PrismaSupervisorDoctorRepository } from '@repositories/prisma/prisma-supervisor-doctor'
import { supervisorDoctorErrorMapping } from '@use-cases/errors/supervisor-doctor/supervisor-doctor-error-mapper'
import { updateSupervisorDoctorPayloadSchema } from '@use-cases/strategies/schemas/supervisor-doctor/update-supervisor-doctor-schema'

export function makeUpdateSupervisorDoctorStrategy(dbContext: DatabaseContext) {
  const supervisorDoctorRepository = new PrismaSupervisorDoctorRepository(dbContext)
  const validator = new ZodValidator(updateSupervisorDoctorPayloadSchema)
  const errorMapper = new PrismaErrorMapper(supervisorDoctorErrorMapping)

  return {
    supervisorDoctorRepository,
    validator,
    errorMapper,
  }
}
