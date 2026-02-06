import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaAuthenticationAuditsRepository } from '@repositories/prisma/prisma-authentication-audits-repository'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { AuthenticateUserUseCase } from '@use-cases/users/authenticate-user'

export function makeAuthenticateUserUseCase() {
  const dbContext = new DatabaseContext()
  const usersRepository = new PrismaUsersRepository(dbContext)
  const authenticationAuditsRepository = new PrismaAuthenticationAuditsRepository()
  const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository, authenticationAuditsRepository)

  return authenticateUserUseCase
}
