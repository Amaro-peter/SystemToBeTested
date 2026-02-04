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
    return await this.dbContext.client.user.findUnique({
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
    return await this.dbContext.client.user.findMany()
  }

  async update(publicId: string, data: Prisma.UserUpdateInput) {
    return await this.dbContext.client.user.update({
      where: { publicId },
      data,
    })
  }

  async delete(id: number) {
    return await this.dbContext.client.user.delete({
      where: {
        id,
      },
    })
  }
}
