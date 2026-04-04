import { ProfessionalCategory, User, UserRole as PrismaUserRole } from '@prisma/client'
import { EnumProfessionalCategory, IInstructor } from '@core/contracts/repositories/instructor-repository.interface'
import { IUser, IUserRole } from '@core/contracts/repositories/users-repository.interface'
import { ErrorType } from '@core/types/error-type'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { DomainError } from 'errors/domain-error'
import { INSTRUCTOR_UNSUPPORTED_SPECIALITY_ERROR } from 'messages/error/instructor/instructor-error-message'
import { USER_UNSUPPORTED_ROLE_ERROR } from 'messages/error/user/user-error-messages'

type UserProfileRelations = Pick<IUser, 'admin' | 'patient' | 'supervisorDoctor' | 'instructor'>

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

  private toBaseUser(user: User): IUser {
    return {
      ...user,
      role: mapUserRole(user.role),
    }
  }

  async load(user: User): Promise<IUser> {
    const [profiledUser] = await this.loadMany([user])

    return profiledUser
  }

  async loadMany(users: User[]): Promise<IUser[]> {
    if (users.length === 0) {
      return []
    }

    const baseUsers = users.map((user) => this.toBaseUser(user))

    const userIdsByRole: Record<IUserRole, number[]> = {
      ADMIN: [],
      INSTRUCTOR: [],
      SUPERVISOR_DOCTOR: [],
      PATIENT: [],
    }

    for (const user of baseUsers) {
      userIdsByRole[user.role].push(user.id)
    }

    const findManyIfAny = async <T>(ids: number[], query: (ids: number[]) => Promise<T[]>): Promise<T[]> => {
      if (ids.length === 0) {
        return []
      }

      return query(ids)
    }

    const [admins, instructors, supervisorDoctors, patients] = await Promise.all([
      findManyIfAny(userIdsByRole.ADMIN, (ids) =>
        this.dbContext.client.admin.findMany({
          where: { userId: { in: ids } },
          select: {
            id: true,
            publicId: true,
            userId: true,
          },
        }),
      ),
      findManyIfAny(userIdsByRole.INSTRUCTOR, (ids) =>
        this.dbContext.client.instructor.findMany({
          where: { userId: { in: ids } },
          select: {
            id: true,
            publicId: true,
            userId: true,
            registration: true,
            speciality: true,
          },
        }),
      ),
      findManyIfAny(userIdsByRole.SUPERVISOR_DOCTOR, (ids) =>
        this.dbContext.client.supervisorDoctor.findMany({
          where: { userId: { in: ids } },
        }),
      ),
      findManyIfAny(userIdsByRole.PATIENT, (ids) =>
        this.dbContext.client.patient.findMany({
          where: { userId: { in: ids } },
        }),
      ),
    ])

    const adminByUserId = new Map(admins.map((admin) => [admin.userId, admin]))
    const instructorByUserId = new Map<number, IInstructor>(
      instructors.map((instructor): [number, IInstructor] => [
        instructor.userId,
        {
          ...instructor,
          speciality: mapInstructorSpeciality(instructor.speciality),
        },
      ]),
    )
    const supervisorDoctorByUserId = new Map(
      supervisorDoctors.map((supervisorDoctor) => [supervisorDoctor.userId, supervisorDoctor]),
    )
    const patientByUserId = new Map(patients.map((patient) => [patient.userId, patient]))

    return baseUsers.map((user) => {
      const relationByRole: UserProfileRelations =
        user.role === 'ADMIN'
          ? { admin: adminByUserId.get(user.id) ?? null }
          : user.role === 'INSTRUCTOR'
            ? { instructor: instructorByUserId.get(user.id) ?? null }
            : user.role === 'SUPERVISOR_DOCTOR'
              ? { supervisorDoctor: supervisorDoctorByUserId.get(user.id) ?? null }
              : { patient: patientByUserId.get(user.id) ?? null }

      return {
        ...user,
        ...relationByRole,
      }
    })
  }
}
