import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { userErrorMapping } from '@use-cases/errors/users/user-error-mapper'
import { DeleteProfileStrategyResolver } from '@use-cases/resolvers/delete-profile-strategy-resolver'
import { DeleteUserUseCase } from '@use-cases/users/delete-user'

export function makeDeleteUserUseCase() {
  const dbContext = new DatabaseContext()
  const usersRepository = new PrismaUsersRepository(dbContext)
  const deleteProfileStrategyResolver = new DeleteProfileStrategyResolver(dbContext)
  const errorMapper = new PrismaErrorMapper(userErrorMapping)
  const deleteUserUseCase = new DeleteUserUseCase(
    usersRepository,
    dbContext,
    errorMapper,
    deleteProfileStrategyResolver,
  )

  return deleteUserUseCase
}
