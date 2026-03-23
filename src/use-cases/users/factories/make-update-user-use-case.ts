import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { TransactionalUseCaseDecorator } from '@use-cases/decorators/transactional-use-case.decorator'
import { userErrorMapping } from '@use-cases/errors/users/user-error-mapper'
import { UpdateUserUseCase } from '@use-cases/users/update-user'
import { UpdateProfileStrategyFactory } from '../../user-profiles/factories/make-update-profile-strategy'

export function makeUpdateUserUseCase() {
  const dbContext = new DatabaseContext()

  const errorMapper = new PrismaErrorMapper(userErrorMapping)

  const usersRepository = new PrismaUsersRepository(dbContext, errorMapper)

  // 1. Instancia a Factory concreta injetando o banco
  const profileFactory = new UpdateProfileStrategyFactory(dbContext)

  // 2. Injeta as dependências no Use Case (sem dbContext ou errorMapper)
  const updateUserUseCase = new UpdateUserUseCase(usersRepository, profileFactory)

  // 3. Envolve no Decorator Transacional
  return new TransactionalUseCaseDecorator(updateUserUseCase, dbContext)
}
