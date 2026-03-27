import { AdminRepository, CreateAdminPayload } from '@core/contracts/repositories/admin-repository'
import { ok, err, Result } from '@core/shared/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaHTTPErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { Admin } from '@prisma/client'

export class PrismaAdminRepository implements AdminRepository {
  constructor(
    private readonly dbContext: DatabaseContext,
    private readonly errorMapper: PrismaHTTPErrorMapper,
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
