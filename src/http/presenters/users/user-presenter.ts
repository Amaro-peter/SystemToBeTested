import { User, UserRole } from '@prisma/client'

export type IUserHTTP = {
  publicId: string
  name: string
  email: string
  cpf: string
  role: UserRole
  phoneNumber: string
  isActive: boolean
  createdAt: Date | null
  updatedAt: Date | null
}

export class UserPresenter {
  static toHTTP(user: User): IUserHTTP
  static toHTTP(users: User[]): IUserHTTP[]
  static toHTTP(input: User | User[]): IUserHTTP | IUserHTTP[] {
    if (Array.isArray(input)) {
      return input.map((u) => this.toHTTP(u))
    }

    return {
      publicId: input.publicId,
      name: input.name,
      email: input.email,
      cpf: input.cpf,
      phoneNumber: input.phoneNumber,
      isActive: input.isActive,
      role: input.role,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
