import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { RegisterUserUseCase } from '@use-cases/users/register-user'

export function makeRegisterUserUseCase() {
  const dbContext = new DatabaseContext()
  const usersRepository = new PrismaUsersRepository(dbContext)
  const registerUseCase = new RegisterUserUseCase(usersRepository, dbContext)

  return registerUseCase
}
