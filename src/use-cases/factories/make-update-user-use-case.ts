import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { userErrorMapping } from '@use-cases/errors/users/user-error-mapper'
import { UpdateUserUseCase } from '@use-cases/users/update-user'
import { PrismaUpdateProfileStrategyResolver } from '@use-cases/resolvers/prisma/prisma-update-profile-strategy-resolver'

export function makeUpdateUserUseCase() {
  const dbContext = new DatabaseContext()
  const usersRepository = new PrismaUsersRepository(dbContext)
  const errorMapper = new PrismaErrorMapper(userErrorMapping)
  const updateProfileStrategyResolver = new PrismaUpdateProfileStrategyResolver(dbContext)
  const updateUserUseCase = new UpdateUserUseCase(
    usersRepository,
    dbContext,
    errorMapper,
    updateProfileStrategyResolver,
  )

  return updateUserUseCase
}
