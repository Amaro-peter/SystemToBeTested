import { Admin } from '@prisma/client'
import { Result } from '@core/shared/result'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreateAdminPayload {}

export interface AdminRepository {
  create(userId: number, data: CreateAdminPayload): Promise<Result<Admin, Error>>
}
