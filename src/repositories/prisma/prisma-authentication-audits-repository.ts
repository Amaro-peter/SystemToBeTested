import { AuthenticationStatus as PrismaAuthenticationStatus } from '@prisma/client'
import {
  AuthenticationAuditsRepository,
  EnumAuthenticationStatus as DomainAuthenticationStatus,
  IAuthenticationAudit,
  ICreateAuthenticationAudit,
} from '@core/contracts/repositories/authentication-audits-repository.interface'
import { err, ok, Result } from '@core/shared/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'

const toPrismaAuthenticationStatus: Record<DomainAuthenticationStatus, PrismaAuthenticationStatus> = {
  [DomainAuthenticationStatus.SUCCESS]: PrismaAuthenticationStatus.SUCCESS,
  [DomainAuthenticationStatus.USER_NOT_EXISTS]: PrismaAuthenticationStatus.USER_NOT_EXISTS,
  [DomainAuthenticationStatus.INCORRECT_PASSWORD]: PrismaAuthenticationStatus.INCORRECT_PASSWORD,
  [DomainAuthenticationStatus.RECOVER_PASSWORD]: PrismaAuthenticationStatus.RECOVER_PASSWORD,
  [DomainAuthenticationStatus.INVALID_TOKEN]: PrismaAuthenticationStatus.INVALID_TOKEN,
  [DomainAuthenticationStatus.BLOCKED]: PrismaAuthenticationStatus.BLOCKED,
}

const toDomainAuthenticationStatus: Record<PrismaAuthenticationStatus, DomainAuthenticationStatus> = {
  [PrismaAuthenticationStatus.SUCCESS]: DomainAuthenticationStatus.SUCCESS,
  [PrismaAuthenticationStatus.USER_NOT_EXISTS]: DomainAuthenticationStatus.USER_NOT_EXISTS,
  [PrismaAuthenticationStatus.INCORRECT_PASSWORD]: DomainAuthenticationStatus.INCORRECT_PASSWORD,
  [PrismaAuthenticationStatus.RECOVER_PASSWORD]: DomainAuthenticationStatus.RECOVER_PASSWORD,
  [PrismaAuthenticationStatus.INVALID_TOKEN]: DomainAuthenticationStatus.INVALID_TOKEN,
  [PrismaAuthenticationStatus.BLOCKED]: DomainAuthenticationStatus.BLOCKED,
}

export class PrismaAuthenticationAuditsRepository implements AuthenticationAuditsRepository {
  constructor(
    private readonly dbContext: DatabaseContext,
    private readonly errorMapper: PrismaErrorMapper,
  ) {}

  async create(data: ICreateAuthenticationAudit): Promise<Result<IAuthenticationAudit, Error>> {
    try {
      const createAudit = await this.dbContext.client.authenticationAudit.create({
        data: {
          ipAddress: data.ipAddress,
          remotePort: data.remotePort,
          userAgent: data.userAgent,
          origin: data.origin,
          status: toPrismaAuthenticationStatus[data.status],
          userId: data.userId,
        },
      })

      return ok({
        ...createAudit,
        status: toDomainAuthenticationStatus[createAudit.status],
      })
    } catch (error) {
      const domainError = this.errorMapper.mapToKnownError(error)
      return err(domainError)
    }
  }
}
