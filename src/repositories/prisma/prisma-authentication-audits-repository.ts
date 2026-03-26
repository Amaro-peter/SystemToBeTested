import { AuthenticationAudit, Prisma } from '@prisma/client'
import { prisma } from '@lib/prisma'
import { AuthenticationAuditsRepository } from '@repositories/authentication-audits-repository'

export class PrismaAuthenticationAuditsRepository implements AuthenticationAuditsRepository {
  async create(data: Prisma.AuthenticationAuditUncheckedCreateInput): Promise<AuthenticationAudit> {
    const authenticationAudit = await prisma.authenticationAudit.create({
      data,
    })
    return authenticationAudit
  }
}
