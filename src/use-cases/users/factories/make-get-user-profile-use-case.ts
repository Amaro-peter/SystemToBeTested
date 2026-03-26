import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaHTTPErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { userHTTPErrorMapping } from '@use-cases/errors/users/user-error-mapper'
import { GetUserProfileUseCase } from '@use-cases/users/get-user-profile'

export function makeGetUserProfileUseCase() {
  const dbContext = new DatabaseContext()
  const errorMapper = new PrismaHTTPErrorMapper(userHTTPErrorMapping)
  const usersRepository = new PrismaUsersRepository(dbContext, errorMapper)
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

  return getUserProfileUseCase
}
