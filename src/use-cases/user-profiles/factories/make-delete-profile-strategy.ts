import { UserRole } from '@prisma/client'
import {
  IUserProfileStrategyFactory,
  UserProfileStrategyCreatorType,
} from '@core/contracts/use-case/user-profiles/factories/user-profile-strategy-factory.interface'
import { IUserProfileStrategy } from '@core/contracts/use-case/user-profiles/strategies/user-profile-strategy.interface'
import { err, ok, Result } from '@core/shared/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { UserWithNoRoleError } from '@use-cases/errors/users/user-with-no-role-error'
import { makeDeleteSupervisorDoctorStrategy } from '../supervisor-doctor/factories/make-delete-supervisor-doctor-strategy'

const strategies: Record<UserRole, UserProfileStrategyCreatorType> = {
  [UserRole.SUPERVISOR_DOCTOR]: (dbContext) => {
    return makeDeleteSupervisorDoctorStrategy(dbContext)
  },

  [UserRole.PATIENT]: () => {
    throw new Error('DeletePatientStrategy not implemented')
  },

  [UserRole.INSTRUCTOR]: () => {
    throw new Error('DeleteInstructorStrategy not implemented')
  },

  [UserRole.ADMIN]: () => {
    throw new Error('DeleteAdminStrategy not implemented')
  },
}

export class DeleteProfileStrategyFactory implements IUserProfileStrategyFactory {
  constructor(private readonly dbContext: DatabaseContext) {}

  createStrategy(role: UserRole): Result<IUserProfileStrategy, Error> {
    const strategyFactory = strategies[role]

    if (!strategyFactory) {
      return err(new UserWithNoRoleError())
    }

    try {
      const strategy = strategyFactory(this.dbContext)
      return ok(strategy)
    } catch (error) {
      return err(error)
    }
  }
}
