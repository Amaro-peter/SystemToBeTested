import { User, UserRole } from '@prisma/client'

type HTTPUser = {
  publicId: string
  name: string
  email: string
  cpf: string
  role: UserRole
  phoneNumber: string
  createdAt: Date
  updatedAt: Date
}

export class UserPresenter {
  static toHTTP(user: User): HTTPUser
  static toHTTP(users: User[]): HTTPUser[]
  static toHTTP(input: User | User[]): HTTPUser | HTTPUser[] {
    if (Array.isArray(input)) {
      return input.map((u) => this.toHTTP(u))
    }

    return {
      publicId: input.publicId,
      name: input.name,
      email: input.email,
      cpf: input.cpf,
      phoneNumber: input.phoneNumber,
      role: input.role,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
