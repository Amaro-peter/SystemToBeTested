import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaHTTPErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { ZodValidator } from '@lib/validation/zod-validator'
import { PrismaSupervisorDoctorRepository } from '@repositories/prisma/prisma-supervisor-doctor'
import { supervisorHTTPErrorMapping } from '@use-cases/errors/supervisor-doctor/supervisor-doctor-error-mapper'
import { RegisterSupervisorDoctorStrategy } from '@use-cases/user-profiles/supervisor-doctor/strategies/register-supervisor-doctor-strategy'
import { registerSupervisorDoctorPayloadSchema } from 'schemas/use-cases/user-profiles/supervisor-doctor/register-supervisor-doctor-schema'

export function makeRegisterSupervisorDoctorStrategy(dbContext: DatabaseContext) {
  const errorMapper = new PrismaHTTPErrorMapper(supervisorHTTPErrorMapping)
  const supervisorDoctorRepository = new PrismaSupervisorDoctorRepository(dbContext, errorMapper)
  const validator = new ZodValidator(registerSupervisorDoctorPayloadSchema)

  return new RegisterSupervisorDoctorStrategy(supervisorDoctorRepository, validator)
}
