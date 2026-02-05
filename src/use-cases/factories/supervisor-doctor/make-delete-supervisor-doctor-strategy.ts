import { PrismaErrorMapper } from "@lib/prisma/utils/prisma-error-mapper"
import { DatabaseContext } from "@lib/prisma/helpers/database-context"
import { PrismaSupervisorDoctorRepository } from "@repositories/prisma/prisma-supervisor-doctor"
import { supervisorDoctorErrorMapping } from "@use-cases/errors/supervisor-doctor/supervisor-doctor-error-mapper"


export function makeDeleteSupervisorDoctorStrategy(dbContext: DatabaseContext) {
  const supervisorDoctorRepository = new PrismaSupervisorDoctorRepository(dbContext)
  const errorMapper = new PrismaErrorMapper(supervisorDoctorErrorMapping)

  return { 
    supervisorDoctorRepository, 
    errorMapper, 
  }
}
