import { UserRole } from '@prisma/client'
import {
  IUserProfileStrategyFactory,
  UserProfileStrategyCreatorType,
} from '@core/contracts/use-case/user-profiles/factories/user-profile-strategy-factory.interface'
import { IUserProfileStrategy } from '@core/contracts/use-case/user-profiles/strategies/user-profile-strategy.interface'
import { err, ok, Result } from '@core/shared/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { UserWithNoRoleError } from '@use-cases/errors/users/user-with-no-role-error'
import { makeAdminRegisterStrategy } from '../admin/factories/make-register-admin'
import { makeRegisterInstructorStrategy } from '../instructor/factories/make-register-instructor-strategy'
import { makeRegisterPatientStrategy } from '../patients/factories/make-register-patient'
import { makeRegisterSupervisorDoctorStrategy } from '../supervisor-doctor/factories/make-register-supervisor-doctor-strategy'

const strategies: Record<UserRole, UserProfileStrategyCreatorType> = {
  [UserRole.SUPERVISOR_DOCTOR]: (dbContext) => {
    return makeRegisterSupervisorDoctorStrategy(dbContext)
  },

  [UserRole.PATIENT]: (dbContext) => {
    return makeRegisterPatientStrategy(dbContext)
  },

  [UserRole.INSTRUCTOR]: (dbContext) => {
    return makeRegisterInstructorStrategy(dbContext)
  },

  [UserRole.ADMIN]: (dbContext) => {
    return makeAdminRegisterStrategy(dbContext)
  },
}

export class RegisterProfileStrategyFactory implements IUserProfileStrategyFactory {
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
