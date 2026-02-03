import { SupervisorDoctor } from '@prisma/client'

export interface SupervisorDoctorCreateInput {
  crm: string
}

export interface SupervisorDoctorRepository {
  create(publicId: string, data: SupervisorDoctorCreateInput): Promise<SupervisorDoctor | null>
}