import { Result } from '@core/logic/result-pattern'
import { UserRole } from '@prisma/client'
import { DeleteProfileStrategy } from '@tps/use-case/users/delete-profile-strategy.interface'

export interface IDeleteProfileStrategyResolver {
  resolve(role: UserRole): Result<DeleteProfileStrategy, Error>
}
