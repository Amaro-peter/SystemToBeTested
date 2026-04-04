import { Gender, Patient, RiskLevel } from '@prisma/client'
import { Result } from '@core/shared/result'

export type CreatePatientPayload = {
  birthDate: Date
  medicationsInUse?: string
  assistantDoctorName?: string
  assistantDoctorPhone?: string
  healthInsuranceNumber?: string
  referenceHospital?: string
  emergencyContactName?: string
  emergencyContactPhone?: string
  healthInsuranceName?: string
  gender: Gender
  riskLevel: RiskLevel
}

export interface IPatient {
  id: number
  publicId: string
  birthDate: Date
  medicationsInUse: string | null
  assistantDoctorName: string | null
  assistantDoctorPhone: string | null
  healthInsuranceNumber: string | null
  referenceHospital: string | null
  emergencyContactName: string | null
  emergencyContactPhone: string | null
  healthInsuranceName: string | null
  gender: string
  riskLevel: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  userId: number
  supervisorDoctorId: number | null
  classId: number | null
}

export interface PatientRepository {
  create(publicId: string, data: CreatePatientPayload): Promise<Result<Patient, Error>>
  update(userId: number, data: Partial<CreatePatientPayload>): Promise<Result<Patient, Error>>
  deactivatePatient(userId: number): Promise<Result<Patient, Error>>
  findByUserId(userId: number): Promise<Patient | null>
}
