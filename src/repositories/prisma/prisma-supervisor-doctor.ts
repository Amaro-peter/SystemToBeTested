import { ok, err, Result } from '@core/logic/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { SupervisorDoctor } from '@prisma/client'
import { SupervisorDoctorPayload, SupervisorDoctorRepository } from '@repositories/supervisor-doctor-respository'
import { supervisorDoctorErrorMapping } from '@use-cases/errors/supervisor-doctor/supervisor-doctor-error-mapper'

export class PrismaSupervisorDoctorRepository implements SupervisorDoctorRepository {
  private errorMapper = new PrismaErrorMapper(supervisorDoctorErrorMapping)

  constructor(private readonly dbContext: DatabaseContext) {}

  async create(publicId: string, data: SupervisorDoctorPayload): Promise<Result<SupervisorDoctor, Error>> {
    try {
      const supervisorDoctor = await this.dbContext.client.supervisorDoctor.create({
        data: {
          ...data,
          user: {
            connect: {
              publicId,
            },
          },
        },
      })

      return ok(supervisorDoctor)
    } catch (error) {
      const domainError = this.errorMapper.mapToKnownError(error)
      return err(domainError)
    }
  }

  async update(userId: number, data: Partial<SupervisorDoctorPayload>): Promise<Result<SupervisorDoctor, Error>> {
    try {
      const updated = await this.dbContext.client.supervisorDoctor.update({
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

  async deactivateSupervisorDoctor(userId: number): Promise<Result<SupervisorDoctor, Error>> {
    try {
      const deactivated = await this.dbContext.client.supervisorDoctor.update({
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
