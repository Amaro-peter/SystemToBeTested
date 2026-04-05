import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { PrismaAdminRepository } from '@repositories/prisma/prisma-admin-repository'
import { adminErrorMapping } from '@use-cases/errors/admin/admin-error-mapper'
import { RegisterAdminStrategy } from '../strategies/register-admin-strategy'

export function makeAdminRegisterStrategy(dbContext: DatabaseContext) {
  const errorMapper = new PrismaErrorMapper(adminErrorMapping)
  const adminRepository = new PrismaAdminRepository(dbContext, errorMapper)

  return new RegisterAdminStrategy(adminRepository)
}
