import { PrismaHTTPErrorMapping } from '@lib/prisma/utils/prisma-error-mapper'
import { PatientAlreadyExistsError } from './patient-already-exists-error'
import { PatientNotFoundError } from './patient-not-found-error'
import { PatientOperationFailedError } from './patient-operation-failed-error'

export const patientHTTPErrorMapping: PrismaHTTPErrorMapping = {
  P2002: () => new PatientAlreadyExistsError(),
  P2025: () => new PatientNotFoundError(),
  P2003: () => new PatientOperationFailedError(),
}
