import { Result } from '@core/logic/result'
import { User } from '@prisma/client'

export enum EnumProfessionalCategory {
  TECNICO_DE_ENFERMAGEM = 'TECNICO_DE_ENFERMAGEM',
  EDUCADOR_FISICO = 'EDUCADOR_FISICO',
}

export type InstructorPayload = {
  registration: string
  speciality: EnumProfessionalCategory
}

export interface IInstructor {
  id: number
  publicId: string

  registration: string
  speciality: EnumProfessionalCategory

  userId: number

  user?: User
}

export interface ISearchInstructorFilters {
  name?: string
  registration?: string
  speciality?: EnumProfessionalCategory
}

export interface InstructorRepository {
  create(publicId: string, data: InstructorPayload): Promise<Result<IInstructor, Error>>
  update(userId: number, data: Partial<InstructorPayload>): Promise<Result<IInstructor, Error>>
  deactivateInstructor(userId: number): Promise<Result<IInstructor, Error>>
  list(page: number, pageSize: number): Promise<Result<IInstructor[], Error>>
  search(filters: ISearchInstructorFilters, page: number, pageSize: number): Promise<Result<IInstructor[], Error>>
}
