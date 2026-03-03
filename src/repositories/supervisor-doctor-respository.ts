import { Result } from '@core/logic/result'
import { DoctorStatus, Patient, TipoCRM, UF, User } from '@prisma/client'

export interface ISupervisorDoctor {
  id: number
  publicId: string

  crm: string
  crmUf: UF
  tipoCrm: TipoCRM
  status: DoctorStatus
  dataRegistro: Date
  dataValidade: Date | null

  userId: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null

  user?: User

  patients?: Patient[]
  patientCount?: number
}

export type SupervisorDoctorPayload = {
  crm: string
  crmUf: UF
  tipoCrm: TipoCRM
  status: DoctorStatus
  dataRegistro: Date
  dataValidade?: Date
}

export interface ISearchSupervisorDoctorFilters {
  name?: string
  crm?: string
  crmUf?: UF
  tipoCrm?: TipoCRM
  status?: DoctorStatus
}

export interface SupervisorDoctorRepository {
  create(publicId: string, data: SupervisorDoctorPayload): Promise<Result<ISupervisorDoctor, Error>>
  update(userId: number, data: Partial<SupervisorDoctorPayload>): Promise<Result<ISupervisorDoctor, Error>>
  deactivateSupervisorDoctor(userId: number): Promise<Result<ISupervisorDoctor, Error>>
  findMany(page: number, pageSize: number): Promise<Result<ISupervisorDoctor[], Error>>
  search(
    filters: ISearchSupervisorDoctorFilters,
    page: number,
    pageSize: number,
  ): Promise<Result<ISupervisorDoctor[], Error>>
}
