import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { AuthenticateUserUseCase } from '@use-cases/users/authenticate-user'

export function makeAuthenticateUserUseCase() {
  const dbContext = new DatabaseContext()
  const usersRepository = new PrismaUsersRepository(dbContext)
  const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)

  return authenticateUserUseCase
}
