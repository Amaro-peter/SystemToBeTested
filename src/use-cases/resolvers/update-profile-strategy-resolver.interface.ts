import { Result } from '@core/logic/result-pattern'
import { UserRole } from '@prisma/client'
import { UpdateProfileStrategy } from '@tps/use-case/users/update-profile-strategy.interface'

export interface IUpdateProfileStrategyResolver {
  resolve(role: UserRole): Result<UpdateProfileStrategy, Error>
}
