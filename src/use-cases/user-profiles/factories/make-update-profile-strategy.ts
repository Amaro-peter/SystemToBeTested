import {
  IProfileStrategyFactory,
  ProfileStrategyCreator,
} from '@core/contracts/use-case/user-profiles/factories/profile-strategy-factory.interface'
import { IProfileStrategy } from '@core/contracts/use-case/user-profiles/strategies/profile-strategy.interface'
import { err, ok, Result } from '@core/shared/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { UserRole } from '@prisma/client'
import { UserWithNoRoleError } from '@use-cases/errors/users/user-with-no-role-error'
import { makeUpdateSupervisorDoctorStrategy } from '../supervisor-doctor/factories/make-update-supervisor-doctor-strategy'

const strategies: Record<UserRole, ProfileStrategyCreator> = {
  [UserRole.SUPERVISOR_DOCTOR]: (dbContext) => {
    return makeUpdateSupervisorDoctorStrategy(dbContext)
  },

  [UserRole.PATIENT]: () => {
    throw new Error('UpdatePatientStrategy not implemented')
  },

  [UserRole.INSTRUCTOR]: () => {
    throw new Error('UpdateInstructorStrategy not implemented')
  },

  [UserRole.ADMIN]: () => {
    throw new Error('UpdateAdminStrategy not implemented')
  },
}

export class UpdateProfileStrategyFactory implements IProfileStrategyFactory {
  constructor(private readonly dbContext: DatabaseContext) {}

  createStrategy(role: UserRole): Result<IProfileStrategy, Error> {
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
