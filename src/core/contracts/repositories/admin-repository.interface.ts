import { Result } from '@core/shared/result'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface CreateAdminPayload {}

export interface IAdmin {
  id: number
  publicId: string
  userId: number
}

export interface AdminRepository {
  create(userId: number, data: CreateAdminPayload): Promise<Result<IAdmin, Error>>
}
