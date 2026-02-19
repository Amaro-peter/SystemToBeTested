import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { ListUsersUseCase } from '@use-cases/users/list-users'

export function makeListUsersUseCase() {
  const dbContext = new DatabaseContext()
  const usersRepository = new PrismaUsersRepository(dbContext)
  const listUsersUseCase = new ListUsersUseCase(usersRepository)

  return listUsersUseCase
}
