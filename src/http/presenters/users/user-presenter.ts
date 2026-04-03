import { EnumProfessionalCategory, IInstructor } from '@core/contracts/repositories/instructor-repository.interface'
import { ISupervisorDoctor } from '@core/contracts/repositories/supervisor-doctor-respository.interface'
import { Admin, DoctorStatus, Gender, Patient, RiskLevel, UF, User, UserRole } from '@prisma/client'

export type UserWithRelations = User & {
  admin?: Admin | null
  patient?: Patient | null
  supervisorDoctor?: ISupervisorDoctor | null
  instructor?: IInstructor | null
}

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null
}

const getProfileField = (profile: unknown, field: string): unknown => {
  if (!isObject(profile)) {
    return undefined
  }

  return profile[field]
}

const isAdminProfile = (value: unknown): value is Admin => {
  return isObject(value) && typeof value.publicId === 'string'
}

const isSupervisorDoctorProfile = (value: unknown): value is ISupervisorDoctor => {
  return (
    isObject(value) &&
    typeof value.publicId === 'string' &&
    typeof value.crm === 'string' &&
    typeof value.crmUf === 'string' &&
    typeof value.status === 'string'
  )
}

const isInstructorProfile = (value: unknown): value is IInstructor => {
  return (
    isObject(value) &&
    typeof value.publicId === 'string' &&
    typeof value.registration === 'string' &&
    typeof value.speciality === 'string'
  )
}

const isPatientProfile = (value: unknown): value is Patient => {
  return (
    isObject(value) &&
    typeof value.publicId === 'string' &&
    value.birthDate instanceof Date &&
    typeof value.gender === 'string' &&
    typeof value.riskLevel === 'string' &&
    (typeof value.assistantDoctorName === 'string' || value.assistantDoctorName === null) &&
    (typeof value.healthInsuranceName === 'string' || value.healthInsuranceName === null)
  )
}

type AdminHTTP = {
  publicId: string
}

type PatientHTTP = {
  publicId: string
  birthDate: Date
  gender: Gender
  riskLevel: RiskLevel
  assistantDoctorName: string | null
  healthInsuranceName: string | null
}

// Update the output to strictly enforce an array of PatientHTTP
type SupervisorDoctorHTTP = {
  publicId: string
  crm: string
  crmUf: UF
  status: DoctorStatus
  dataRegistro?: Date | null
  dataValidade?: Date | null
  patientCount?: number
  patients?: PatientHTTP[]
}

type InstructorHTTP = {
  publicId: string
  registration: string
  speciality: EnumProfessionalCategory
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
  static toHTTP(user: UserWithRelations, userProfile?: unknown): IUserHTTP
  static toHTTP(users: UserWithRelations[]): IUserHTTP[]
  static toHTTP(input: UserWithRelations | UserWithRelations[], userProfile?: unknown): IUserHTTP | IUserHTTP[] {
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
      case UserRole.ADMIN: {
        const adminProfile = getProfileField(userProfile, 'admin') ?? userProfile
        const adminData = isAdminProfile(adminProfile) ? adminProfile : input.admin
        if (adminData) {
          base.admin = {
            publicId: adminData.publicId,
          }
        }
        break
      }

      case UserRole.SUPERVISOR_DOCTOR: {
        const supervisorProfile = getProfileField(userProfile, 'supervisorDoctor') ?? userProfile
        const supervisorData = isSupervisorDoctorProfile(supervisorProfile) ? supervisorProfile : input.supervisorDoctor
        if (supervisorData) {
          base.supervisorDoctor = {
            publicId: supervisorData.publicId,
            crm: supervisorData.crm,
            crmUf: supervisorData.crmUf,
            status: supervisorData.status,
            dataRegistro: supervisorData.dataRegistro,
            dataValidade: supervisorData.dataValidade,
            patientCount: supervisorData.patientCount ?? 0,

            // We safely map over the Prisma patients and convert them to PatientHTTP shapes
            patients: supervisorData.patients?.map((patient) => ({
              publicId: patient.publicId,
              birthDate: patient.birthDate,
              gender: patient.gender,
              riskLevel: patient.riskLevel,
              assistantDoctorName: patient.assistantDoctorName,
              healthInsuranceName: patient.healthInsuranceName,
            })),
          }
        }
        break
      }

      case UserRole.INSTRUCTOR: {
        const instructorProfile = getProfileField(userProfile, 'instructor') ?? userProfile
        const instructorData = isInstructorProfile(instructorProfile) ? instructorProfile : input.instructor
        if (instructorData) {
          base.instructor = {
            publicId: instructorData.publicId,
            registration: instructorData.registration,
            speciality: instructorData.speciality,
          }
        }
        break
      }

      case UserRole.PATIENT: {
        const patientProfile = getProfileField(userProfile, 'patient') ?? userProfile
        const patientData = isPatientProfile(patientProfile) ? patientProfile : input.patient
        if (patientData) {
          base.patient = {
            publicId: patientData.publicId,
            birthDate: patientData.birthDate,
            gender: patientData.gender,
            riskLevel: patientData.riskLevel,
            assistantDoctorName: patientData.assistantDoctorName,
            healthInsuranceName: patientData.healthInsuranceName,
          }
        }
        break
      }
    }

    return base
  }
}
