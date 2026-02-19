import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { ZodValidator } from '@lib/validation/zod-validator'
import { PrismaSupervisorDoctorRepository } from '@repositories/prisma/prisma-supervisor-doctor'
import { updateSupervisorDoctorPayloadSchema } from '@use-cases/user-profiles/supervisor-doctor/schemas/update-supervisor-doctor-schema'
import { UpdateSupervisorDoctorStrategy } from '@use-cases/user-profiles/supervisor-doctor/strategies/update-supervisor-doctor-strategy'

export function makeUpdateSupervisorDoctorStrategy(dbContext: DatabaseContext) {
  const supervisorDoctorRepository = new PrismaSupervisorDoctorRepository(dbContext)
  const validator = new ZodValidator(updateSupervisorDoctorPayloadSchema)

  return new UpdateSupervisorDoctorStrategy(supervisorDoctorRepository, validator)
}
