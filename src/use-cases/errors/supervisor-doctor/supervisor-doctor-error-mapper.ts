import { PrismaErrorMapping } from '@lib/prisma/utils/prisma-error-mapper'
import { SupervisorDoctorAlreadyExistsError } from '@use-cases/errors/supervisor-doctor/supervisor-doctor-already-exists-error'
import { SupervisorDoctorNotFoundError } from './supervisor-doctor-not-found-error'
import { SupervisorDoctorOperationFailedError } from './supervisor-doctor-operation-failed-error'

export const supervisorErrorMapping: PrismaErrorMapping = {
  P2002: () => new SupervisorDoctorAlreadyExistsError(),
  P2025: () => new SupervisorDoctorNotFoundError(),
  P2003: () => new SupervisorDoctorOperationFailedError(),
}
