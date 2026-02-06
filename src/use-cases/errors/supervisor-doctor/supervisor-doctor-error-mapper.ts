import { PrismaErrorMapping } from '@lib/prisma/utils/prisma-error-mapper'
import { SupervisorDoctorAlreadyExistsError } from '@use-cases/errors/supervisor-doctor/supervisor-doctor-already-exists-error'
import { SupervisorDoctorCouldNotBeUpdatedError } from '@use-cases/errors/supervisor-doctor/supervisor-doctor-could-not-be-updated-error'
import { SupervisorDoctorNotFoundError } from './supervisor-doctor-not-found-error'

export const supervisorDoctorErrorMapping: PrismaErrorMapping = {
  P2002: () => new SupervisorDoctorAlreadyExistsError(),
  P2025: () => new SupervisorDoctorNotFoundError(),
  P2003: () => new SupervisorDoctorCouldNotBeUpdatedError(),
}
