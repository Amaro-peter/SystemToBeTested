import { ISupervisorDoctor } from '@core/contracts/repositories/supervisor-doctor-respository.interface'
import { IUserHTTP, UserPresenter } from '../users/user-presenter'

interface ISupervisorDoctorHTTP {
  publicId: string
  crm: string
  crmUf: string
  status: string
  dataRegistro: Date | null
  dataValidade: Date | null
  patientCount: number
  createdAt: Date | null
  updatedAt: Date | null
  user?: IUserHTTP
  patients: {
    publicId: string
    birthDate: Date | null
    medicationsInUse?: string | null
    assistantDoctorName?: string | null
    assistantDoctorPhone?: string | null
    healthInsuranceNumber?: string | null
    referenceHospital?: string | null
    emergencyContactName?: string | null
    emergencyContactPhone?: string | null
    healthInsuranceName?: string | null
    gender: string
    riskLevel: string
    createdAt: Date | null
    updatedAt: Date | null
  }[]
}

export class SupervisorDoctorPresenter {
  static toHTTP(input: ISupervisorDoctor | ISupervisorDoctor[]): ISupervisorDoctorHTTP | ISupervisorDoctorHTTP[] {
    if (Array.isArray(input)) {
      return input.map((item) => this.toHTTP(item) as ISupervisorDoctorHTTP)
    }

    return {
      publicId: input.publicId,

      crm: input.crm,
      crmUf: input.crmUf,
      status: input.status,
      dataRegistro: input.dataRegistro,
      dataValidade: input.dataValidade,

      patientCount: input.patientCount ? input.patientCount : 0,

      createdAt: input.createdAt,
      updatedAt: input.updatedAt,

      user: input.user ? UserPresenter.toHTTP(input.user) : undefined,

      patients:
        input.patients?.map((patient) => ({
          publicId: patient.publicId,
          birthDate: patient.birthDate,
          medicationsInUse: patient.medicationsInUse,
          assistantDoctorName: patient.assistantDoctorName,
          assistantDoctorPhone: patient.assistantDoctorPhone,
          healthInsuranceNumber: patient.healthInsuranceNumber,
          referenceHospital: patient.referenceHospital,
          emergencyContactName: patient.emergencyContactName,
          emergencyContactPhone: patient.emergencyContactPhone,
          healthInsuranceName: patient.healthInsuranceName,
          gender: patient.gender,
          riskLevel: patient.riskLevel,
          createdAt: patient.createdAt,
          updatedAt: patient.updatedAt,
        })) ?? [],
    }
  }
}
