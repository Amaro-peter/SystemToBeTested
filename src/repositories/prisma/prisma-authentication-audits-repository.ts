import { AuthenticationAudit, Prisma } from '@prisma/client'
import { AuthenticationAuditsRepository } from '@core/contracts/repositories/authentication-audits-repository.interface'
import { prisma } from '@lib/prisma'

export class PrismaAuthenticationAuditsRepository implements AuthenticationAuditsRepository {
  async create(data: Prisma.AuthenticationAuditUncheckedCreateInput): Promise<AuthenticationAudit> {
    const authenticationAudit = await prisma.authenticationAudit.create({
      data,
    })
    return authenticationAudit
  }
}
