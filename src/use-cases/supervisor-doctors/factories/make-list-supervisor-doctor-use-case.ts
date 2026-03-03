import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaSupervisorDoctorRepository } from '@repositories/prisma/prisma-supervisor-doctor'
import { ListSupervisorDoctorUseCase } from '../list-supervisor-doctor'

export function makeListSupervisorDoctorUseCase() {
  const dbContext = new DatabaseContext()

  const supervisorDoctorRepository = new PrismaSupervisorDoctorRepository(dbContext)

  const listSupervisorDoctorUseCase = new ListSupervisorDoctorUseCase(supervisorDoctorRepository)

  return listSupervisorDoctorUseCase
}
