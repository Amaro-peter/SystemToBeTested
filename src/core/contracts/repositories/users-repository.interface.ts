import { Prisma, User } from '@prisma/client'
import { IInstructor } from '@core/contracts/repositories/instructor-repository.interface'
import { ISupervisorDoctor } from '@core/contracts/repositories/supervisor-doctor-respository.interface'
import { Result } from '@core/shared/result'
import { IAdmin } from './admin-repository.interface'
import { IPatient } from './patient-repository.interface'

export type IUserRole = 'ADMIN' | 'SUPERVISOR_DOCTOR' | 'INSTRUCTOR' | 'PATIENT'

export interface IUser {
  id: number
  publicId: string
  name: string
  email: string
  cpf: string
  phoneNumber: string
  passwordHash: string
  role: IUserRole
  token: string | null
  tokenExpiresAt: Date | null
  passwordChangedAt: Date | null
  loginAttempts: number
  lastLogin: Date | null
  isActive: boolean
  deletedAt: Date | null
  createdAt: Date
  updatedAt: Date

  admin?: IAdmin | null
  patient?: IPatient | null
  supervisorDoctor?: ISupervisorDoctor | null
  instructor?: IInstructor | null
}

export interface TokenData {
  token: string | null
  tokenExpiresAt: Date | null
}

export interface ISearchUserFilters {
  name?: string
  email?: string
  cpf?: string
  isActive?: boolean
  role?: IUserRole
}

export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<Result<User, Error>>
  findBy(where: Prisma.UserWhereUniqueInput): Promise<User | null>
  findByEmailOrCpf(email: string, cpf: string): Promise<User | null>
  findByEmailWithProfile(email: string): Promise<Result<IUser, Error>>
  list(page: number, pageSize: number): Promise<Result<IUser[], Error>>
  update(publicId: string, data: Prisma.UserUpdateInput): Promise<Result<User, Error>>
  deactivateUser(id: number): Promise<Result<User, Error>>
  search(filters: ISearchUserFilters, page: number, pageSize: number): Promise<Result<IUser[], Error>>
}
