import { PrismaErrorMapping } from '@lib/prisma/utils/prisma-error-mapper'
import { HealthProfessionalAlreadyExistsError } from './health-professional-already-exists-error'
import { HealthProfessionalNotFoundError } from './health-professional-not-found-error'
import { HealthProfessionalOperationFailedError } from './patient-operation-failed-error'

export const healthProfessionalErrorMapping: PrismaErrorMapping = {
  P2002: () => new HealthProfessionalAlreadyExistsError(),
  P2025: () => new HealthProfessionalNotFoundError(),
  P2003: () => new HealthProfessionalOperationFailedError(),
}
