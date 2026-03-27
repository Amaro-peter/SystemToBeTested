import {
  IProfileStrategyFactory,
  ProfileStrategyCreator,
} from '@core/contracts/use-case/user-profiles/factories/profile-strategy-factory.interface'
import { IProfileStrategy } from '@core/contracts/use-case/user-profiles/strategies/profile-strategy.interface'
import { err, ok, Result } from '@core/shared/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { UserRole } from '@prisma/client'
import { UserWithNoRoleError } from '@use-cases/errors/users/user-with-no-role-error'
import { MakeAdminRegisterStrategy } from '../admin/factories/make-register-admin'
import { makeRegisterInstructorStrategy } from '../instructor/factories/make-register-instructor-strategy'
import { makeRegisterPatientStrategy } from '../patients/factories/make-register-patient'
import { makeRegisterSupervisorDoctorStrategy } from '../supervisor-doctor/factories/make-register-supervisor-doctor-strategy'

const strategies: Record<UserRole, ProfileStrategyCreator> = {
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
    return MakeAdminRegisterStrategy(dbContext)
  },
}

export class RegisterProfileStrategyFactory implements IProfileStrategyFactory {
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
