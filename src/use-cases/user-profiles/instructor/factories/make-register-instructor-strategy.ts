import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { ZodValidator } from '@lib/validation/zod-validator'
import { PrismaInstructorRepository } from '@repositories/prisma/prisma-instructor-repository'
import { instructorErrorMapping } from '@use-cases/errors/instructor/instructor-error-mapper'
import { RegisterInstructorStrategy } from '@use-cases/user-profiles/instructor/strategies/register-instructor-strategy'
import { registerInstructorPayloadSchema } from 'schemas/use-cases/user-profiles/instructor/register-instructor-schema'

export function makeRegisterInstructorStrategy(dbContext: DatabaseContext) {
  const errorMapper = new PrismaErrorMapper(instructorErrorMapping)
  const instructorRepository = new PrismaInstructorRepository(dbContext, errorMapper)
  const validator = new ZodValidator(registerInstructorPayloadSchema)

  return new RegisterInstructorStrategy(instructorRepository, validator)
}
