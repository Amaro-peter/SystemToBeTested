import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { userErrorMapping } from '@use-cases/errors/users/user-error-mapper'
import { SearchUsersUseCase } from '../search-users'

export function makeSearchUsersUseCase() {
  const databaseContext = new DatabaseContext()
  const errorMapper = new PrismaErrorMapper(userErrorMapping)
  const usersRepository = new PrismaUsersRepository(databaseContext, errorMapper)

  const searchUsersUseCase = new SearchUsersUseCase(usersRepository)

  return searchUsersUseCase
}
