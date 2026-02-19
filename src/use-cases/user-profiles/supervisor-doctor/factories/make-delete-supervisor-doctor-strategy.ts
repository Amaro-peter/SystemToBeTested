import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaSupervisorDoctorRepository } from '@repositories/prisma/prisma-supervisor-doctor'
import { DeleteSupervisorDoctorStrategy } from '@use-cases/user-profiles/supervisor-doctor/strategies/delete-supervisor-doctor-strategy'

export function makeDeleteSupervisorDoctorStrategy(dbContext: DatabaseContext) {
  const supervisorDoctorRepository = new PrismaSupervisorDoctorRepository(dbContext)

  return new DeleteSupervisorDoctorStrategy(supervisorDoctorRepository)
}
