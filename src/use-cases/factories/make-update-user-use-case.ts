import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { userErrorMapping } from '@use-cases/errors/users/user-error-mapper'
import { PrismaUpdateProfileStrategyResolver } from '@use-cases/resolvers/prisma/prisma-update-profile-strategy-resolver'
import { UpdateUserUseCase } from '@use-cases/users/update-user'

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
