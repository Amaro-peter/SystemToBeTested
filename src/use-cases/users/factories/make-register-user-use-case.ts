// src/use-cases/factories/users/make-register-user-use-case.ts

import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { TransactionalUseCaseDecorator } from '@use-cases/decorators/transactional-use-case.decorator'
import { userErrorMapping } from '@use-cases/errors/users/user-error-mapper'
import { RegisterUserUseCase } from '@use-cases/users/register-user'
import { RegisterProfileStrategyFactory } from '../../user-profiles/factories/make-register-profile-strategy' // Importe a classe nova

export function makeRegisterUserUseCase() {
  const dbContext = new DatabaseContext()
  const errorMapper = new PrismaErrorMapper(userErrorMapping)
  const usersRepository = new PrismaUsersRepository(dbContext, errorMapper)

  // 1. Instanciamos a Factory CONCRETA passando o banco
  const profileFactory = new RegisterProfileStrategyFactory(dbContext)

  // 2. Injetamos a Factory no Use Case (que espera a Interface)
  const registerUserUseCase = new RegisterUserUseCase(usersRepository, profileFactory)

  // 3. Decoramos com a Transação
  return new TransactionalUseCaseDecorator(registerUserUseCase, dbContext)
}
