import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { userErrorMapping } from '@use-cases/errors/users/user-error-mapper'
import { ListUsersUseCase } from '@use-cases/users/list-users'

export function makeListUsersUseCase() {
  const dbContext = new DatabaseContext()
  const errorMapper = new PrismaErrorMapper(userErrorMapping)
  const usersRepository = new PrismaUsersRepository(dbContext, errorMapper)
  const listUsersUseCase = new ListUsersUseCase(usersRepository)

  return listUsersUseCase
}
