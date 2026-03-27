import { Result } from '@core/shared/result'
import { Prisma, User } from '@prisma/client'

export interface TokenData {
  token: string | null
  tokenExpiresAt: Date | null
}

export interface ISearchUserFilters {
  name?: string
  email?: string
  cpf?: string
  isActive?: boolean
}

export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<Result<User, Error>>
  findBy(where: Prisma.UserWhereUniqueInput): Promise<User | null>
  findByEmailOrCpf(email: string, cpf: string): Promise<User | null>
  list(page: number, pageSize: number): Promise<Result<User[], Error>>
  update(publicId: string, data: Prisma.UserUpdateInput): Promise<Result<User, Error>>
  deactivateUser(id: number): Promise<Result<User, Error>>
  search(filters: ISearchUserFilters, page: number, pageSize: number): Promise<Result<User[], Error>>
}
