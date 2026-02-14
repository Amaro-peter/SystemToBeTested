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
  create(publicId: string, data: SupervisorDoctorPayload): Promise<SupervisorDoctor>
  update(userId: number, data: Partial<SupervisorDoctorPayload>): Promise<SupervisorDoctor>
  deactivateSupervisorDoctor(userId: number): Promise<SupervisorDoctor>
}
