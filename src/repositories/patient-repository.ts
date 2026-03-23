import { Result } from '@core/logic/result'
import { Gender, Patient, RiskLevel } from '@prisma/client'

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

export interface PatientRepository {
  create(publicId: string, data: CreatePatientPayload): Promise<Result<Patient, Error>>
  update(userId: number, data: Partial<CreatePatientPayload>): Promise<Result<Patient, Error>>
  deactivatePatient(userId: number): Promise<Result<Patient, Error>>
  findByUserId(userId: number): Promise<Patient | null>
}
