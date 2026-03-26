import { PrismaHTTPErrorMapping } from '@lib/prisma/utils/prisma-error-mapper'
import { UserAlreadyExistsError } from '@use-cases/errors/users/user-already-exists-error'
import { UserNotFoundError } from './user-not-found-error'
import { UserOperationFailedError } from './user-operation-failed-error'

export const userHTTPErrorMapping: PrismaHTTPErrorMapping = {
  P2002: () => new UserAlreadyExistsError(),
  P2025: () => new UserNotFoundError(),
  P2003: () => new UserOperationFailedError(),
}
