import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { PrismaSupervisorDoctorRepository } from '@repositories/prisma/prisma-supervisor-doctor'
import { supervisorDoctorErrorMapping } from '@use-cases/errors/supervisor-doctor/supervisor-doctor-error-mapper'
import { ListSupervisorDoctorUseCase } from '../list-supervisor-doctor'

export function makeListSupervisorDoctorUseCase() {
  const dbContext = new DatabaseContext()
  const errorMappeer = new PrismaErrorMapper(supervisorDoctorErrorMapping)
  const supervisorDoctorRepository = new PrismaSupervisorDoctorRepository(dbContext, errorMappeer)

  const listSupervisorDoctorUseCase = new ListSupervisorDoctorUseCase(supervisorDoctorRepository)

  return listSupervisorDoctorUseCase
}
