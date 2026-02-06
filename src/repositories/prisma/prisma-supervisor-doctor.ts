import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { SupervisorDoctorCreateInput, SupervisorDoctorRepository } from '@repositories/supervisor-doctor-respository'

export class PrismaSupervisorDoctorRepository implements SupervisorDoctorRepository {
  constructor(private readonly dbContext: DatabaseContext) {}

  async create(publicId: string, data: SupervisorDoctorCreateInput) {
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

  async update(userId: number, data: SupervisorDoctorCreateInput) {
    const updated = await this.dbContext.client.supervisorDoctor.update({
      where: {
        userId: userId,
      },
      data: {
        crm: data.crm,
      },
    })
    return updated
  }

  async deactivateSupervisorDoctor(userId: number) {
    const deactivatedSupervisorDoctor = await this.dbContext.client.supervisorDoctor.update({
      where: {
        userId: userId,
        isActive: true,
      },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    })

    return deactivatedSupervisorDoctor
  }
}
