import { Result } from '@core/shared/result'

export enum EnumAuthenticationStatus {
  SUCCESS = 'SUCCESS',
  USER_NOT_EXISTS = 'USER_NOT_EXISTS',
  INCORRECT_PASSWORD = 'INCORRECT_PASSWORD',
  RECOVER_PASSWORD = 'RECOVER_PASSWORD',
  INVALID_TOKEN = 'INVALID_TOKEN',
  BLOCKED = 'BLOCKED',
}

export interface ICreateAuthenticationAudit {
  ipAddress?: string | null
  remotePort?: string | null
  userAgent?: string | null
  origin?: string | null
  status: EnumAuthenticationStatus
  userId?: number | null
}

export interface IAuthenticationAudit {
  id: number
  ipAddress: string | null
  remotePort: string | null
  userAgent: string | null
  origin: string | null
  status: EnumAuthenticationStatus
  userId: number | null
  createdAt: Date
}

export interface AuthenticationAuditsRepository {
  create(data: ICreateAuthenticationAudit): Promise<Result<IAuthenticationAudit, Error>>
}
