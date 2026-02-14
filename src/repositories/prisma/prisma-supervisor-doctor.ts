import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { SupervisorDoctorPayload, SupervisorDoctorRepository } from '@repositories/supervisor-doctor-respository'

export class PrismaSupervisorDoctorRepository implements SupervisorDoctorRepository {
  constructor(private readonly dbContext: DatabaseContext) {}

  async create(publicId: string, data: SupervisorDoctorPayload) {
    return await this.dbContext.client.supervisorDoctor.create({
      data: {
        ...data,
        user: {
          connect: {
            publicId,
          },
        },
      },
    })
  }

  async update(userId: number, data: Partial<SupervisorDoctorPayload>) {
    const updated = await this.dbContext.client.supervisorDoctor.update({
      where: {
        userId: userId,
      },
      data: {
        ...data,
      },
    })
    return updated
  }

  async deactivateSupervisorDoctor(userId: number) {
    const deactivatedSupervisorDoctor = await this.dbContext.client.supervisorDoctor.update({
      where: {
        userId: userId,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    return deactivatedSupervisorDoctor
  }
}
