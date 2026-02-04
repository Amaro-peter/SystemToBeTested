import { PrismaErrorMapper } from "@lib/prisma/utils/prisma-error-mapper"
import { ZodValidator } from "@core/domain/validation/zod-validator"
import { DatabaseContext } from "@lib/prisma/helpers/database-context"
import { PrismaSupervisorDoctorRepository } from "@repositories/prisma/prisma-supervisor-doctor"
import { supervisorDoctorErrorMapping } from "@use-cases/errors/supervisor-doctor/supervisor-doctor-error-mapper"
import { supervisorDoctorPayloadSchema } from "@use-cases/strategies/schemas/supervisor-doctor/supervisor-doctor-schema"


export function makeUpdateSupervisorDoctorStrategy(dbContext: DatabaseContext) {
  const supervisorDoctorRepository = new PrismaSupervisorDoctorRepository(dbContext)
  const validator = new ZodValidator(supervisorDoctorPayloadSchema)
  const errorMapper = new PrismaErrorMapper(supervisorDoctorErrorMapping)

  return { 
    supervisorDoctorRepository, 
    validator, 
    errorMapper 
  }
}
