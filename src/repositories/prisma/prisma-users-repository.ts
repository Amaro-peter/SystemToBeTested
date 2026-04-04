import { Prisma, User } from '@prisma/client'
import { ISearchUserFilters, IUser, UserRepository } from '@core/contracts/repositories/users-repository.interface'
import { ok, err, Result } from '@core/shared/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { UserNotFoundError } from '@use-cases/errors/users/user-not-found-error'
import { PrismaUserProfileLoader } from './prisma-profile-loader-strategy'

export class PrismaUsersRepository implements UserRepository {
  private readonly profileLoader: PrismaUserProfileLoader

  constructor(
    private readonly dbContext: DatabaseContext,
    private readonly errorMapper: PrismaErrorMapper,
  ) {
    this.profileLoader = new PrismaUserProfileLoader(this.dbContext)
  }

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

  async findByEmailWithProfile(email: string): Promise<Result<IUser, Error>> {
    try {
      const user = await this.dbContext.client.user.findUnique({
        where: { email },
      })

      if (!user) return err(new UserNotFoundError())

      const userWithProfile = await this.profileLoader.load(user)

      return ok(userWithProfile)
    } catch (error) {
      const domainError = this.errorMapper.mapToKnownError(error)
      return err(domainError)
    }
  }

  async list(page: number, pageSize: number): Promise<Result<IUser[], Error>> {
    try {
      const users = await this.dbContext.client.user.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
      })

      const usersWithProfiles = await this.profileLoader.loadMany(users)

      return ok(usersWithProfiles)
    } catch (error) {
      const domainError = this.errorMapper.mapToKnownError(error)
      return err(domainError)
    }
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

  async search(filters: ISearchUserFilters, page: number, pageSize: number): Promise<Result<IUser[], Error>> {
    try {
      const { name, email, cpf, isActive, role } = filters ?? {}

      const where: Prisma.UserWhereInput = {}

      if (name) {
        where.name = {
          contains: name,
          mode: 'insensitive',
        }
      }

      if (email) {
        where.email = {
          contains: email,
          mode: 'insensitive',
        }
      }

      if (cpf) {
        where.cpf = cpf
      }

      if (isActive !== undefined) {
        where.isActive = isActive
      }

      if (role) {
        where.role = role
      }

      const users = await this.dbContext.client.user.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy: {
          name: 'asc',
        },
      })

      const usersWithProfiles = await this.profileLoader.loadMany(users)

      return ok(usersWithProfiles)
    } catch (error) {
      const domainError = this.errorMapper.mapToKnownError(error)
      return err(domainError)
    }
  }
}
