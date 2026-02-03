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
}
