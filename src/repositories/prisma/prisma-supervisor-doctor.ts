import { Prisma, SupervisorDoctor, User } from '@prisma/client'
import { ok, err, Result } from '@core/logic/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import {
  ISearchSupervisorDoctorFilters,
  ISupervisorDoctor,
  SupervisorDoctorPayload,
  SupervisorDoctorRepository,
} from '@repositories/supervisor-doctor-respository'

export class PrismaSupervisorDoctorRepository implements SupervisorDoctorRepository {
  constructor(
    private readonly dbContext: DatabaseContext,
    private errorMapper: PrismaErrorMapper,
  ) {}

  async create(publicId: string, data: SupervisorDoctorPayload): Promise<Result<ISupervisorDoctor, Error>> {
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

  async update(userId: number, data: Partial<SupervisorDoctorPayload>): Promise<Result<ISupervisorDoctor, Error>> {
    try {
      const updated = await this.dbContext.client.supervisorDoctor.update({
        where: {
          userId: userId,
        },
        data: {
          ...data,
        },
        include: {},
      })
      return ok(updated)
    } catch (error) {
      const domainError = this.errorMapper.mapToKnownError(error)
      return err(domainError)
    }
  }

  async deactivateSupervisorDoctor(userId: number): Promise<Result<ISupervisorDoctor, Error>> {
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

  async list(page: number, pageSize: number): Promise<Result<ISupervisorDoctor[], Error>> {
    try {
      const supervisorDoctors = await this.dbContext.client.supervisorDoctor.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          user: true,
          _count: {
            select: {
              patients: true,
            },
          },
        },
      })

      const result = supervisorDoctors.map((supervisorDoctor) => this.mapToDomain(supervisorDoctor))

      return ok(result)
    } catch (error) {
      const domainError = this.errorMapper.mapToKnownError(error)
      return err(domainError)
    }
  }

  async search(
    filters: ISearchSupervisorDoctorFilters,
    page: number,
    pageSize: number,
  ): Promise<Result<ISupervisorDoctor[], Error>> {
    try {
      const where: Prisma.SupervisorDoctorWhereInput = {}

      if (filters.name) {
        where.user = {
          name: {
            contains: filters.name,
            mode: 'insensitive',
          },
        }
      }

      if (filters.crm) {
        where.crm = {
          contains: filters.crm,
        }
      }

      if (filters.crmUf) {
        where.crmUf = filters.crmUf
      }

      if (filters.tipoCrm) {
        where.tipoCrm = filters.tipoCrm
      }

      if (filters.status) {
        where.status = filters.status
      }

      const supervisorDoctors = await this.dbContext.client.supervisorDoctor.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy: {
          user: {
            name: 'asc',
          },
        },
        include: {
          user: true,
          _count: {
            select: {
              patients: true,
            },
          },
        },
      })

      const result = supervisorDoctors.map((supervisorDoctor) => this.mapToDomain(supervisorDoctor))

      return ok(result)
    } catch (error) {
      const domainError = this.errorMapper.mapToKnownError(error)
      return err(domainError)
    }
  }

  private mapToDomain(
    supervisorDoctor: SupervisorDoctor & { user?: User; _count?: { patients: number } },
  ): ISupervisorDoctor {
    return {
      ...supervisorDoctor,
      user: supervisorDoctor.user,
      patientCount: supervisorDoctor._count?.patients,
    }
  }

  async findByUserId(userId: number): Promise<SupervisorDoctor | null> {
    const supervisorDoctor = await this.dbContext.client.supervisorDoctor.findUnique({
      where: {
        userId,
      },
    })
    return supervisorDoctor
  }
}
