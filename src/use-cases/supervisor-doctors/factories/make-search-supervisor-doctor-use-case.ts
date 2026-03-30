import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { PrismaSupervisorDoctorRepository } from '@repositories/prisma/prisma-supervisor-doctor'
import { supervisorErrorMapping } from '@use-cases/errors/supervisor-doctor/supervisor-doctor-error-mapper'
import { SearchSupervisorDoctorUseCase } from '../search-supervisor-doctor'

export function makeSearchSupervisorDoctorUseCase() {
  const databaseContext = new DatabaseContext()
  const errorMapper = new PrismaErrorMapper(supervisorErrorMapping)
  const supervisorDoctorRepository = new PrismaSupervisorDoctorRepository(databaseContext, errorMapper)
  const searchSupervisorDoctorUseCase = new SearchSupervisorDoctorUseCase(supervisorDoctorRepository)

  return searchSupervisorDoctorUseCase
}
