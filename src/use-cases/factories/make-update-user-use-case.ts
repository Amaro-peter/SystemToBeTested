import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { UpdateUserUseCase } from '@use-cases/users/update-user'

export function makeUpdateUserUseCase() {
  const dbContext = new DatabaseContext()
  const usersRepository = new PrismaUsersRepository(dbContext)
  const updateUserUseCase = new UpdateUserUseCase(usersRepository, dbContext)

  return updateUserUseCase
}
