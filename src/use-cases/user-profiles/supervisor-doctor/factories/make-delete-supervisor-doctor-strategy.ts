import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { PrismaSupervisorDoctorRepository } from '@repositories/prisma/prisma-supervisor-doctor'
import { supervisorDoctorErrorMapping } from '@use-cases/errors/supervisor-doctor/supervisor-doctor-error-mapper'
import { DeleteSupervisorDoctorStrategy } from '@use-cases/user-profiles/supervisor-doctor/strategies/delete-supervisor-doctor-strategy'

export function makeDeleteSupervisorDoctorStrategy(dbContext: DatabaseContext) {
  const errorMapper = new PrismaErrorMapper(supervisorDoctorErrorMapping)
  const supervisorDoctorRepository = new PrismaSupervisorDoctorRepository(dbContext, errorMapper)

  return new DeleteSupervisorDoctorStrategy(supervisorDoctorRepository)
}
