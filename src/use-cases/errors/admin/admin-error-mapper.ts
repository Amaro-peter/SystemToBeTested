import { PrismaHTTPErrorMapping } from '@lib/prisma/utils/prisma-error-mapper'
import { AdminAlreadyExistsError } from './admin-already-exists-error'
import { AdminNotFoundError } from './admin-not-found-error'
import { AdminOperationFailedError } from './admin-operation-failed-error'

export const adminHTTPErrorMapping: PrismaHTTPErrorMapping = {
  P2002: () => new AdminAlreadyExistsError(),
  P2025: () => new AdminNotFoundError(),
  P2003: () => new AdminOperationFailedError(),
}
