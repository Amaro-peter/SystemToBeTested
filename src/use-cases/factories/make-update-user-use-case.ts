import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { userErrorMapping } from '@use-cases/errors/users/user-error-mapper'
import { UpdateUserUseCase } from '@use-cases/users/update-user'

export function makeUpdateUserUseCase() {
  const dbContext = new DatabaseContext()
  const usersRepository = new PrismaUsersRepository(dbContext)
  const errorMapper = new PrismaErrorMapper(userErrorMapping)
  const updateUserUseCase = new UpdateUserUseCase(usersRepository, dbContext, errorMapper)

  return updateUserUseCase
}
