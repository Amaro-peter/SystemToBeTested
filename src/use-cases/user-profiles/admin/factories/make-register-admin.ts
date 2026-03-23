import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { ZodValidator } from '@lib/validation/zod-validator'
import { PrismaAdminRepository } from '@repositories/prisma/prisma-admin-repository'
import { adminErrorMapping } from '@use-cases/errors/admin/admin-error-mapper'
import { registerAdminPayloadSchema } from '../schemas/register-admin-schema'
import { RegisterAdminStrategy } from '../strategies/register-admin-strategy'

export function MakeAdminRegisterStrategy(dbContext: DatabaseContext) {
  const errorMapper = new PrismaErrorMapper(adminErrorMapping)
  const adminRepository = new PrismaAdminRepository(dbContext, errorMapper)
  const validator = new ZodValidator(registerAdminPayloadSchema)

  return new RegisterAdminStrategy(adminRepository, validator)
}
