import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { ZodValidator } from '@lib/validation/zod-validator'
import { PrismaSupervisorDoctorRepository } from '@repositories/prisma/prisma-supervisor-doctor'
import { registerSupervisorDoctorPayloadSchema } from '@use-cases/user-profiles/supervisor-doctor/schemas/register-supervisor-doctor-schema'
import { RegisterSupervisorDoctorStrategy } from '@use-cases/user-profiles/supervisor-doctor/strategies/register-supervisor-doctor-strategy'

export function makeRegisterSupervisorDoctorStrategy(dbContext: DatabaseContext) {
  const supervisorDoctorRepository = new PrismaSupervisorDoctorRepository(dbContext)

  const validator = new ZodValidator(registerSupervisorDoctorPayloadSchema)

  return new RegisterSupervisorDoctorStrategy(supervisorDoctorRepository, validator)
}
