import { Admin } from '@prisma/client'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { AdminRepository } from '@repositories/admin-repositoy'

export class PrismaAdminRepository implements AdminRepository {
  constructor(private readonly dbContext: DatabaseContext) {}

  async findByUserId(userId: number): Promise<Admin | null> {
    const admin = await this.dbContext.client.admin.findUnique({
      where: {
        userId,
      },
    })
    return admin
  }
}
