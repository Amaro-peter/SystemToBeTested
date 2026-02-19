import { Result } from '@core/logic/result'
import { DoctorStatus, SupervisorDoctor, TipoCRM, UF } from '@prisma/client'

export type SupervisorDoctorPayload = {
  crm: string
  crmUf: UF
  tipoCrm: TipoCRM
  status: DoctorStatus
  dataRegistro: Date
  dataValidade?: Date
}

export interface SupervisorDoctorRepository {
  create(publicId: string, data: SupervisorDoctorPayload): Promise<Result<SupervisorDoctor, Error>>
  update(userId: number, data: Partial<SupervisorDoctorPayload>): Promise<Result<SupervisorDoctor, Error>>
  deactivateSupervisorDoctor(userId: number): Promise<Result<SupervisorDoctor, Error>>
}
