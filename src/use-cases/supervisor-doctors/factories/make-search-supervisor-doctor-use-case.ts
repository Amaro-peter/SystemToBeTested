import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaSupervisorDoctorRepository } from '@repositories/prisma/prisma-supervisor-doctor'
import { SearchSupervisorDoctorUseCase } from '../search-supervisor-doctor'

export function makeSearchSupervisorDoctorUseCase() {
  const databaseContext = new DatabaseContext()
  const supervisorDoctorRepository = new PrismaSupervisorDoctorRepository(databaseContext)
  const searchSupervisorDoctorUseCase = new SearchSupervisorDoctorUseCase(supervisorDoctorRepository)

  return searchSupervisorDoctorUseCase
}
