import {
  IInstructor,
  ISearchInstructorFilters,
  InstructorPayload,
  InstructorRepository,
} from '@core/contracts/repositories/instructor-repository.interface'
import { ok, err, Result } from '@core/shared/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaHTTPErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { Prisma } from '@prisma/client'

export class PrismaInstructorRepository implements InstructorRepository {
  constructor(
    private readonly dbContext: DatabaseContext,
    private readonly errorMapper: PrismaHTTPErrorMapper,
  ) {}

  async create(publicId: string, data: InstructorPayload): Promise<Result<IInstructor, Error>> {
    try {
      const instructor = await this.dbContext.client.instructor.create({
        data: {
          ...data,
          user: {
            connect: {
              publicId,
            },
          },
        },
      })

      return ok(instructor as unknown as IInstructor)
    } catch (error) {
      const domainError = this.errorMapper.mapToKnownError(error)
      return err(domainError)
    }
  }

  async update(userId: number, data: Partial<InstructorPayload>): Promise<Result<IInstructor, Error>> {
    try {
      const updated = await this.dbContext.client.instructor.update({
        where: { userId },
        data: { ...data },
      })
      return ok(updated as unknown as IInstructor)
    } catch (error) {
      const domainError = this.errorMapper.mapToKnownError(error)
      return err(domainError)
    }
  }

  async deactivateInstructor(userId: number): Promise<Result<IInstructor, Error>> {
    try {
      const instructor = await this.dbContext.client.instructor.update({
        where: { userId },
        data: {
          user: {
            update: {
              isActive: false,
              deletedAt: new Date(),
            },
          },
        },
      })
      return ok(instructor as unknown as IInstructor)
    } catch (error) {
      return err(this.errorMapper.mapToKnownError(error))
    }
  }

  async list(page: number, pageSize: number): Promise<Result<IInstructor[], Error>> {
    try {
      const instructors = await this.dbContext.client.instructor.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        where: {
          user: { isActive: true },
        },
        include: {
          user: true,
        },
      })
      return ok(instructors as unknown as IInstructor[])
    } catch (error) {
      const domainError = this.errorMapper.mapToKnownError(error)
      return err(domainError)
    }
  }

  async search(
    filters: ISearchInstructorFilters,
    page: number,
    pageSize: number,
  ): Promise<Result<IInstructor[], Error>> {
    try {
      const where: Prisma.InstructorWhereInput = {
        user: { isActive: true },
      }

      if (filters.name) {
        where.user = {
          ...((where.user as object) ?? {}),
          name: {
            contains: filters.name,
            mode: 'insensitive',
          },
        }
      }

      if (filters.registration) {
        where.registration = {
          contains: filters.registration,
          mode: 'insensitive',
        }
      }

      if (filters.speciality) {
        where.speciality = filters.speciality
      }

      const instructors = await this.dbContext.client.instructor.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy: {
          user: { name: 'asc' },
        },
        include: {
          user: true,
        },
      })

      return ok(instructors as unknown as IInstructor[])
    } catch (error) {
      const domainError = this.errorMapper.mapToKnownError(error)
      return err(domainError)
    }
  }
}
