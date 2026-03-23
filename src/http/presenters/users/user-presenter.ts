import { Admin, Instructor, Patient, SupervisorDoctor, User, UserRole } from '@prisma/client'

// Tipo que reflete o User com todas as relações incluídas no search
export type UserWithRelations = User & {
  admin?: Admin | null
  patient?: Patient | null
  supervisorDoctor?: SupervisorDoctor | null
  Instructor?: Instructor | null
}

type AdminHTTP = {
  publicId: string
}

type SupervisorDoctorHTTP = {
  publicId: string
  crm: string
  crmUf: string
  tipoCrm: string
  status: string
}

type InstructorHTTP = {
  publicId: string
  registration: string
  speciality: string
}

type PatientHTTP = {
  publicId: string
  birthDate: Date
  gender: string
  riskLevel: string
  assistantDoctorName: string | null
  healthInsuranceName: string | null
}

export type IUserHTTP = {
  publicId: string
  name: string
  email: string
  cpf: string
  role: UserRole
  phoneNumber: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  admin?: AdminHTTP
  supervisorDoctor?: SupervisorDoctorHTTP
  instructor?: InstructorHTTP
  patient?: PatientHTTP
}

export class UserPresenter {
  static toHTTP(user: UserWithRelations): IUserHTTP
  static toHTTP(users: UserWithRelations[]): IUserHTTP[]
  static toHTTP(input: UserWithRelations | UserWithRelations[]): IUserHTTP | IUserHTTP[] {
    if (Array.isArray(input)) {
      return input.map((u) => this.toHTTP(u))
    }

    const base: IUserHTTP = {
      publicId: input.publicId,
      name: input.name,
      email: input.email,
      cpf: input.cpf,
      phoneNumber: input.phoneNumber,
      isActive: input.isActive,
      role: input.role,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }

    switch (input.role) {
      case UserRole.ADMIN:
        if (input.admin) {
          base.admin = {
            publicId: input.admin.publicId,
          }
        }
        break

      case UserRole.SUPERVISOR_DOCTOR:
        if (input.supervisorDoctor) {
          base.supervisorDoctor = {
            publicId: input.supervisorDoctor.publicId,
            crm: input.supervisorDoctor.crm,
            crmUf: input.supervisorDoctor.crmUf,
            tipoCrm: input.supervisorDoctor.tipoCrm,
            status: input.supervisorDoctor.status,
          }
        }
        break

      case UserRole.INSTRUCTOR:
        if (input.Instructor) {
          base.instructor = {
            publicId: input.Instructor.publicId,
            registration: input.Instructor.registration,
            speciality: input.Instructor.speciality,
          }
        }
        break

      case UserRole.PATIENT:
        if (input.patient) {
          base.patient = {
            publicId: input.patient.publicId,
            birthDate: input.patient.birthDate,
            gender: input.patient.gender,
            riskLevel: input.patient.riskLevel,
            assistantDoctorName: input.patient.assistantDoctorName,
            healthInsuranceName: input.patient.healthInsuranceName,
          }
        }
        break
    }

    return base
  }
}
