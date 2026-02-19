import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { TransactionalUseCaseDecorator } from '@use-cases/decorators/transactional-use-case.decorator'
import { DeleteUserUseCase } from '@use-cases/users/delete-user'
import { DeleteProfileStrategyFactory } from '../../user-profiles/factories/make-delete-profile-strategy'

export function makeDeleteUserUseCase() {
  const dbContext = new DatabaseContext()

  const usersRepository = new PrismaUsersRepository(dbContext)

  // 1. Factory de Estratégias
  const profileFactory = new DeleteProfileStrategyFactory(dbContext)

  // 2. Use Case Puro
  const deleteUserUseCase = new DeleteUserUseCase(usersRepository, profileFactory)

  // 3. Decorator Transacional (Garante atomicidade da desativação do perfil + usuário)
  return new TransactionalUseCaseDecorator(deleteUserUseCase, dbContext)
}
