import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { ZodValidator } from '@lib/validation/zod-validator'
import { PrismaSupervisorDoctorRepository } from '@repositories/prisma/prisma-supervisor-doctor'
import { supervisorDoctorErrorMapping } from '@use-cases/errors/supervisor-doctor/supervisor-doctor-error-mapper'
import { updateSupervisorDoctorPayloadSchema } from '@use-cases/user-profiles/supervisor-doctor/schemas/update-supervisor-doctor-schema'
import { UpdateSupervisorDoctorStrategy } from '@use-cases/user-profiles/supervisor-doctor/strategies/update-supervisor-doctor-strategy'

export function makeUpdateSupervisorDoctorStrategy(dbContext: DatabaseContext) {
  const errorMapper = new PrismaErrorMapper(supervisorDoctorErrorMapping)
  const supervisorDoctorRepository = new PrismaSupervisorDoctorRepository(dbContext, errorMapper)
  const validator = new ZodValidator(updateSupervisorDoctorPayloadSchema)

  return new UpdateSupervisorDoctorStrategy(supervisorDoctorRepository, validator)
}
