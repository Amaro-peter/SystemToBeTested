import { AuthenticationAuditsRepository } from '@core/contracts/repositories/authentication-audits-repository'
import { prisma } from '@lib/prisma'
import { AuthenticationAudit, Prisma } from '@prisma/client'

export class PrismaAuthenticationAuditsRepository implements AuthenticationAuditsRepository {
  async create(data: Prisma.AuthenticationAuditUncheckedCreateInput): Promise<AuthenticationAudit> {
    const authenticationAudit = await prisma.authenticationAudit.create({
      data,
    })
    return authenticationAudit
  }
}
