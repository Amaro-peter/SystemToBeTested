import { Admin } from '@prisma/client'

export interface AdminRepository {
  findByUserId(userId: number): Promise<Admin | null>
}
