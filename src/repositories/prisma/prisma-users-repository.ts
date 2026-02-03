import { prisma } from '@lib/prisma'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { Prisma } from '@prisma/client'
import { UserRepository } from '@repositories/users-repository'

export class PrismaUsersRepository implements UserRepository {
  constructor(private readonly dbContext: DatabaseContext) {}

  async create(data: Prisma.UserCreateInput) {
    return await this.dbContext.client.user.create({
      data,
    })
  }

  async findBy(where: Prisma.UserWhereUniqueInput) {
    return await prisma.user.findUnique({
      where,
    })
  }

  async findByEmailOrCpf(email: string, cpf: string) {
    return await this.dbContext.client.user.findFirst({
      where: {
        OR: [{ email }, { cpf }],
      },
    })
  }

  async list() {
    return await prisma.user.findMany()
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    return await prisma.user.update({
      where: { id },
      data,
    })
  }

  async delete(id: number) {
    return await prisma.user.delete({
      where: {
        id,
      },
    })
  }
}
