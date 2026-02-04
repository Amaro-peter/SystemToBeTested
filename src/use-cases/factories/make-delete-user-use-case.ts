import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { DeleteUserUseCase } from '@use-cases/users/delete-user'

export function makeDeleteUserUseCase() {
  const dbContext = new DatabaseContext()
  const usersRepository = new PrismaUsersRepository(dbContext)
  const deleteUserUseCase = new DeleteUserUseCase(usersRepository)

  return deleteUserUseCase
}
