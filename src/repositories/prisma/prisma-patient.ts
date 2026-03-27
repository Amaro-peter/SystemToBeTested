import { CreatePatientPayload, PatientRepository } from '@core/contracts/repositories/patient-repository'
import { ok, err, Result } from '@core/shared/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaHTTPErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { Patient } from '@prisma/client'

export class PrismaPatientRepository implements PatientRepository {
  constructor(
    private readonly dbContext: DatabaseContext,
    private readonly errorMapper: PrismaHTTPErrorMapper,
  ) {}

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

  async findByUserId(userId: number): Promise<Patient | null> {
    const patient = await this.dbContext.client.patient.findUnique({
      where: {
        userId,
      },
    })
    return patient
  }
}
