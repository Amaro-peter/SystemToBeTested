import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { userErrorMapping } from '@use-cases/errors/users/user-error-mapper'
import { ForgotPasswordUseCase } from '@use-cases/users/forgot-password'

export function makeForgotPasswordUseCase() {
  const dbContext = new DatabaseContext()
  const errorMapper = new PrismaErrorMapper(userErrorMapping)
  const usersRepository = new PrismaUsersRepository(dbContext, errorMapper)
  const forgotPasswordUseCase = new ForgotPasswordUseCase(usersRepository)

  return forgotPasswordUseCase
}
