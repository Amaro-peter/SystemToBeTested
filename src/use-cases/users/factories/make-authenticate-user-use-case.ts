import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaHTTPErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { PrismaAuthenticationAuditsRepository } from '@repositories/prisma/prisma-authentication-audits-repository'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { userHTTPErrorMapping } from '@use-cases/errors/users/user-error-mapper'
import { AuthenticateUserUseCase } from '@use-cases/users/authenticate-user'

export function makeAuthenticateUserUseCase() {
  const dbContext = new DatabaseContext()
  const errorMapper = new PrismaHTTPErrorMapper(userHTTPErrorMapping)
  const usersRepository = new PrismaUsersRepository(dbContext, errorMapper)
  const authenticationAuditsRepository = new PrismaAuthenticationAuditsRepository()
  const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository, authenticationAuditsRepository)

  return authenticateUserUseCase
}
