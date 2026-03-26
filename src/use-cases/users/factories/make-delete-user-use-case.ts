import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaHTTPErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { TransactionalUseCaseDecorator } from '@use-cases/decorators/transactional-use-case.decorator'
import { userHTTPErrorMapping } from '@use-cases/errors/users/user-error-mapper'
import { DeleteUserUseCase } from '@use-cases/users/delete-user'
import { DeleteProfileStrategyFactory } from '../../user-profiles/factories/make-delete-profile-strategy'

export function makeDeleteUserUseCase() {
  const dbContext = new DatabaseContext()

  const errorMapper = new PrismaHTTPErrorMapper(userHTTPErrorMapping)

  const usersRepository = new PrismaUsersRepository(dbContext, errorMapper)

  // 1. Factory de Estratégias
  const profileFactory = new DeleteProfileStrategyFactory(dbContext)

  // 2. Use Case Puro
  const deleteUserUseCase = new DeleteUserUseCase(usersRepository, profileFactory)

  // 3. Decorator Transacional (Garante atomicidade da desativação do perfil + usuário)
  return new TransactionalUseCaseDecorator(deleteUserUseCase, dbContext)
}
