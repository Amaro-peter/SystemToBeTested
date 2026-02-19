import { ok, err, Result } from '@core/logic/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { Prisma, User } from '@prisma/client'
import { UserRepository } from '@repositories/users-repository'
import { userErrorMapping } from '@use-cases/errors/users/user-error-mapper'

export class PrismaUsersRepository implements UserRepository {
  private errorMapper = new PrismaErrorMapper(userErrorMapping)

  constructor(private readonly dbContext: DatabaseContext) {}

  async create(data: Prisma.UserCreateInput): Promise<Result<User, Error>> {
    try {
      const user = await this.dbContext.client.user.create({
        data,
      })

      return ok(user)
    } catch (error) {
      const domainError = this.errorMapper.mapToKnownError(error)
      return err(domainError)
    }
  }

  async findBy(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return await this.dbContext.client.user.findUnique({
      where,
    })
  }

  async findByEmailOrCpf(email: string, cpf: string): Promise<User | null> {
    return await this.dbContext.client.user.findFirst({
      where: {
        OR: [{ email }, { cpf }],
      },
    })
  }

  async list(): Promise<User[]> {
    return await this.dbContext.client.user.findMany()
  }

  async update(publicId: string, data: Prisma.UserUpdateInput): Promise<Result<User, Error>> {
    try {
      const user = await this.dbContext.client.user.update({
        where: { publicId },
        data,
      })
      return ok(user)
    } catch (error) {
      const domainError = this.errorMapper.mapToKnownError(error)
      return err(domainError)
    }
  }

  async deactivateUser(id: number): Promise<Result<User, Error>> {
    try {
      const user = await this.dbContext.client.user.update({
        where: {
          id,
          isActive: true,
        },
        data: {
          isActive: false,
          deletedAt: new Date(),
        },
      })
      return ok(user)
    } catch (error) {
      return err(this.errorMapper.mapToKnownError(error))
    }
  }
}
