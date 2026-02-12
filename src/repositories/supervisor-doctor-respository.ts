import { SupervisorDoctor } from '@prisma/client'

export interface SupervisorDoctorCreateInput {
  crm: string
}

export interface SupervisorDoctorRepository {
  create(publicId: string, data: SupervisorDoctorCreateInput): Promise<SupervisorDoctor>
  update(userId: number, data: SupervisorDoctorCreateInput): Promise<SupervisorDoctor>
  deactivateSupervisorDoctor(userId: number): Promise<SupervisorDoctor>
}
