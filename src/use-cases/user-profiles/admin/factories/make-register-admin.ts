import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaHTTPErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { ZodValidator } from '@lib/validation/zod-validator'
import { PrismaAdminRepository } from '@repositories/prisma/prisma-admin-repository'
import { adminHTTPErrorMapping } from '@use-cases/errors/admin/admin-error-mapper'
import { registerAdminPayloadSchema } from '../../../../schemas/use-cases/user-profiles/admin/register-admin-schema'
import { RegisterAdminStrategy } from '../strategies/register-admin-strategy'

export function MakeAdminRegisterStrategy(dbContext: DatabaseContext) {
  const errorMapper = new PrismaHTTPErrorMapper(adminHTTPErrorMapping)
  const adminRepository = new PrismaAdminRepository(dbContext, errorMapper)
  const validator = new ZodValidator(registerAdminPayloadSchema)

  return new RegisterAdminStrategy(adminRepository, validator)
}
