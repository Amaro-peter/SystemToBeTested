import { ProfessionalCategory, User, UserRole as PrismaUserRole } from '@prisma/client'
import { EnumProfessionalCategory, IInstructor } from '@core/contracts/repositories/instructor-repository.interface'
import { IUser, IUserRole } from '@core/contracts/repositories/users-repository.interface'
import { ErrorType } from '@core/types/error-type'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { DomainError } from 'errors/domain-error'
import { INSTRUCTOR_UNSUPPORTED_SPECIALITY_ERROR } from 'messages/error/health-professional/health-professional-error-message'
import { USER_UNSUPPORTED_ROLE_ERROR } from 'messages/error/user/user-error-messages'

type UserProfileRelations = Pick<IUser, 'admin' | 'patient' | 'supervisorDoctor' | 'instructor'>
type UserProfileResolver = (userId: number) => Promise<UserProfileRelations>

class UnsupportedInstructorSpecialityError extends DomainError {
  constructor() {
    super(INSTRUCTOR_UNSUPPORTED_SPECIALITY_ERROR, ErrorType.BAD_REQUEST)
  }
}

class UnsupportedUserRoleError extends DomainError {
  constructor() {
    super(USER_UNSUPPORTED_ROLE_ERROR, ErrorType.BAD_REQUEST)
  }
}

const mapInstructorSpeciality = (speciality: ProfessionalCategory): EnumProfessionalCategory => {
  switch (speciality) {
    case ProfessionalCategory.TECNICO_DE_ENFERMAGEM:
      return EnumProfessionalCategory.TECNICO_DE_ENFERMAGEM
    case ProfessionalCategory.EDUCADOR_FISICO:
      return EnumProfessionalCategory.EDUCADOR_FISICO
    default: {
      throw new UnsupportedInstructorSpecialityError()
    }
  }
}

const mapUserRole = (role: PrismaUserRole): IUserRole => {
  switch (role) {
    case PrismaUserRole.ADMIN:
      return 'ADMIN'
    case PrismaUserRole.SUPERVISOR_DOCTOR:
      return 'SUPERVISOR_DOCTOR'
    case PrismaUserRole.INSTRUCTOR:
      return 'INSTRUCTOR'
    case PrismaUserRole.PATIENT:
      return 'PATIENT'
    default: {
      throw new UnsupportedUserRoleError()
    }
  }
}

export class PrismaUserProfileLoader {
  constructor(private readonly dbContext: DatabaseContext) {}

  private readonly resolvers: Record<IUserRole, UserProfileResolver> = {
    ADMIN: async (userId: number) => {
      const admin = await this.dbContext.client.admin.findUnique({
        where: { userId },
        select: {
          id: true,
          publicId: true,
          userId: true,
        },
      })
      return { admin }
    },
    INSTRUCTOR: async (userId: number) => {
      const instructor = await this.dbContext.client.instructor.findUnique({
        where: { userId },
        select: {
          id: true,
          publicId: true,
          userId: true,
          registration: true,
          speciality: true,
        },
      })

      if (!instructor) {
        return {}
      }

      const instructorProfile: IInstructor = {
        ...instructor,
        speciality: mapInstructorSpeciality(instructor.speciality),
      }

      return { instructor: instructorProfile }
    },
    SUPERVISOR_DOCTOR: async (userId: number) => {
      const supervisorDoctor = await this.dbContext.client.supervisorDoctor.findUnique({ where: { userId } })
      return { supervisorDoctor }
    },
    PATIENT: async (userId: number) => {
      const patient = await this.dbContext.client.patient.findUnique({ where: { userId } })
      return { patient }
    },
  }

  async load(user: User): Promise<IUser> {
    const baseUser: IUser = {
      ...user,
      role: mapUserRole(user.role),
    }

    const resolveProfile = this.resolvers[baseUser.role]

    if (!resolveProfile) {
      return baseUser
    }

    const profile = await resolveProfile(user.id)

    return {
      ...baseUser,
      ...profile,
    }
  }
}
