import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { PrismaAuthenticationAuditsRepository } from '@repositories/prisma/prisma-authentication-audits-repository'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { authenticationAuditErrorMapping } from '@use-cases/errors/authentication-audit/authentication-audit-error-mapper'
import { userErrorMapping } from '@use-cases/errors/users/user-error-mapper'
import { AuthenticateUserUseCase } from '../authenticate-user'

export function makeAuthenticateUserUseCase() {
  const dbContext = new DatabaseContext()
  const userErrorMapper = new PrismaErrorMapper(userErrorMapping)
  const authenticationAuditErrorMapper = new PrismaErrorMapper(authenticationAuditErrorMapping)
  const usersRepository = new PrismaUsersRepository(dbContext, userErrorMapper)
  const authenticationAuditsRepository = new PrismaAuthenticationAuditsRepository(
    dbContext,
    authenticationAuditErrorMapper,
  )
  const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository, authenticationAuditsRepository)

  return authenticateUserUseCase
}
