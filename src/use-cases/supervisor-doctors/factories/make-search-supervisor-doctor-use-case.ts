import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaHTTPErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { PrismaSupervisorDoctorRepository } from '@repositories/prisma/prisma-supervisor-doctor'
import { supervisorHTTPErrorMapping } from '@use-cases/errors/supervisor-doctor/supervisor-doctor-error-mapper'
import { SearchSupervisorDoctorUseCase } from '../search-supervisor-doctor'

export function makeSearchSupervisorDoctorUseCase() {
  const databaseContext = new DatabaseContext()
  const errorMapper = new PrismaHTTPErrorMapper(supervisorHTTPErrorMapping)
  const supervisorDoctorRepository = new PrismaSupervisorDoctorRepository(databaseContext, errorMapper)
  const searchSupervisorDoctorUseCase = new SearchSupervisorDoctorUseCase(supervisorDoctorRepository)

  return searchSupervisorDoctorUseCase
}
