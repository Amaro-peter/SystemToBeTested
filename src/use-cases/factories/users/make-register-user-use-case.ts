import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { userErrorMapping } from '@use-cases/errors/users/user-error-mapper'
import { RegisterProfileStrategyResolver } from '@use-cases/resolvers/register-profile-strategy-resolver'
import { RegisterUserUseCase } from '@use-cases/users/register-user'

export function makeRegisterUserUseCase() {
  const dbContext = new DatabaseContext()

  const usersRepository = new PrismaUsersRepository(dbContext)

  const errorMapper = new PrismaErrorMapper(userErrorMapping)

  const registerProfileStrategyResolver = new RegisterProfileStrategyResolver(dbContext)

  const registerUserUseCase = new RegisterUserUseCase(
    usersRepository,
    dbContext,
    errorMapper,
    registerProfileStrategyResolver,
  )

  return registerUserUseCase
}
