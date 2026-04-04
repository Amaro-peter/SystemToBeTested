import { Admin, DoctorStatus, Patient, UF, User, UserRole } from '@prisma/client'
import { IAdmin } from '@core/contracts/repositories/admin-repository.interface'
import { EnumProfessionalCategory, IInstructor } from '@core/contracts/repositories/instructor-repository.interface'
import { IPatient } from '@core/contracts/repositories/patient-repository.interface'
import { ISupervisorDoctor } from '@core/contracts/repositories/supervisor-doctor-respository.interface'
import { IUser } from '@core/contracts/repositories/users-repository.interface'

export type UserWithRelations = (User | IUser) & {
  admin?: Admin | IAdmin | null
  patient?: Patient | IPatient | null
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

const getPublicId = (value: unknown): string | undefined => {
  if (!isObject(value)) {
    return undefined
  }

  const { publicId } = value

  return typeof publicId === 'string' && publicId.length > 0 ? publicId : undefined
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

const isPatientProfile = (value: unknown): value is Patient | IPatient => {
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

export type PatientHTTP = {
  publicId: string
  birthDate: Date | null
  gender: string
  riskLevel: string
  medicationsInUse?: string | null
  assistantDoctorName?: string | null
  assistantDoctorPhone?: string | null
  healthInsuranceNumber?: string | null
  referenceHospital?: string | null
  emergencyContactName?: string | null
  emergencyContactPhone?: string | null
  healthInsuranceName?: string | null
  createdAt?: Date | null
  updatedAt?: Date | null
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

const mapPatientToHTTP = (patient: Partial<Patient | IPatient>): PatientHTTP => ({
  publicId: patient.publicId ?? '',
  birthDate: patient.birthDate ?? null,
  gender: patient.gender ?? '',
  riskLevel: patient.riskLevel ?? '',
  medicationsInUse: patient.medicationsInUse,
  assistantDoctorName: patient.assistantDoctorName,
  assistantDoctorPhone: patient.assistantDoctorPhone,
  healthInsuranceNumber: patient.healthInsuranceNumber,
  referenceHospital: patient.referenceHospital,
  emergencyContactName: patient.emergencyContactName,
  emergencyContactPhone: patient.emergencyContactPhone,
  healthInsuranceName: patient.healthInsuranceName,
  createdAt: patient.createdAt,
  updatedAt: patient.updatedAt,
})

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
        const adminPublicId = getPublicId(adminData) ?? getPublicId(input.admin)

        if (adminPublicId) {
          base.admin = {
            publicId: adminPublicId,
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

            ...(supervisorData.patientCount && supervisorData.patientCount > 0
              ? { patientCount: supervisorData.patientCount }
              : {}),

            ...(supervisorData.patients && supervisorData.patients.length > 0
              ? {
                  patients: supervisorData.patients.map(mapPatientToHTTP),
                }
              : {}),
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
          base.patient = mapPatientToHTTP(patientData)
        }
        break
      }
    }

    return base
  }
}
