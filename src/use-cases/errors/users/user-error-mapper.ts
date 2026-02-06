import { PrismaErrorMapping } from '@lib/prisma/utils/prisma-error-mapper'
import { UserAlreadyExistsError } from '@use-cases/errors/users/user-already-exists-error'
import { UserCouldNotBeUpdatedError } from '@use-cases/errors/users/user-could-not-be-updated-error'

export const userErrorMapping: PrismaErrorMapping = {
  P2002: () => new UserAlreadyExistsError(),
  P2025: () => new UserCouldNotBeUpdatedError(),
}
