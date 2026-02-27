import { ok, err, Result } from '@core/logic/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { Patient } from '@prisma/client'
import { CreatePatientPayload, PatientRepository } from '@repositories/patient-repository'
import { patientErrorMapping } from '@use-cases/errors/patients/patient-error-mapper'

export class PrismaPatientRepository implements PatientRepository {
  private errorMapper = new PrismaErrorMapper(patientErrorMapping)

  constructor(private readonly dbContext: DatabaseContext) {}

  async create(publicId: string, data: CreatePatientPayload): Promise<Result<Patient, Error>> {
    try {
      const patient = await this.dbContext.client.patient.create({
        data: {
          ...data,
          user: {
            connect: {
              publicId,
            },
          },
        },
      })

      return ok(patient)
    } catch (error) {
      const domainError = this.errorMapper.mapToKnownError(error)
      return err(domainError)
    }
  }

  async update(userId: number, data: Partial<CreatePatientPayload>): Promise<Result<Patient, Error>> {
    try {
      const updated = await this.dbContext.client.patient.update({
        where: {
          userId: userId,
        },
        data: {
          ...data,
        },
      })
      return ok(updated)
    } catch (error) {
      const domainError = this.errorMapper.mapToKnownError(error)
      return err(domainError)
    }
  }

  async deactivatePatient(userId: number): Promise<Result<Patient, Error>> {
    try {
      const deactivated = await this.dbContext.client.patient.update({
        where: {
          userId: userId,
        },
        data: {
          deletedAt: new Date(),
        },
      })
      return ok(deactivated)
    } catch (error) {
      return err(this.errorMapper.mapToKnownError(error))
    }
  }
}
