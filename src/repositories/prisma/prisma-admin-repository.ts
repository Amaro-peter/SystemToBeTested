import { Admin } from '@prisma/client'
import { ok, err, Result } from '@core/logic/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { AdminRepository, CreateAdminPayload } from '@repositories/admin-repository'

export class PrismaAdminRepository implements AdminRepository {
  constructor(
    private readonly dbContext: DatabaseContext,
    private readonly errorMapper: PrismaErrorMapper,
  ) {}

  async create(userId: number, data: CreateAdminPayload): Promise<Result<Admin, Error>> {
    try {
      const admin = await this.dbContext.client.admin.create({
        data: {
          ...data,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      })

      return ok(admin)
    } catch (error) {
      const domainError = this.errorMapper.mapToKnownError(error)
      return err(domainError)
    }
  }
}
