import { PrismaHTTPErrorMapping } from '@lib/prisma/utils/prisma-error-mapper'
import { InstructorAlreadyExistsError } from './instructor-already-exists-error'
import { InstructorNotFoundError } from './instructor-not-found-error'
import { InstructorOperationFailedError } from './instructor-operation-failed-error'

export const instructorHTTPErrorMapping: PrismaHTTPErrorMapping = {
  P2002: () => new InstructorAlreadyExistsError(),
  P2025: () => new InstructorNotFoundError(),
  P2003: () => new InstructorOperationFailedError(),
}
