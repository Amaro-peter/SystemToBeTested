import { Result } from '@core/logic/result'
import { Prisma, User } from '@prisma/client'

export interface TokenData {
  token: string | null
  tokenExpiresAt: Date | null
}

export interface UserRepository {
  create(data: Prisma.UserCreateInput): Promise<Result<User, Error>>
  findBy(where: Prisma.UserWhereUniqueInput): Promise<User | null>
  findByEmailOrCpf(email: string, cpf: string): Promise<User | null>
  list(): Promise<User[]>
  update(publicId: string, data: Prisma.UserUpdateInput): Promise<Result<User, Error>>
  deactivateUser(id: number): Promise<Result<User, Error>>
}
