import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { PrismaSupervisorDoctorRepository } from '@repositories/prisma/prisma-supervisor-doctor'
import { supervisorErrorMapping } from '@use-cases/errors/supervisor-doctor/supervisor-doctor-error-mapper'
import { ListSupervisorDoctorUseCase } from '../list-supervisor-doctor'

export function makeListSupervisorDoctorUseCase() {
  const dbContext = new DatabaseContext()
  const errorMapper = new PrismaErrorMapper(supervisorErrorMapping)
  const supervisorDoctorRepository = new PrismaSupervisorDoctorRepository(dbContext, errorMapper)

  const listSupervisorDoctorUseCase = new ListSupervisorDoctorUseCase(supervisorDoctorRepository)

  return listSupervisorDoctorUseCase
}
