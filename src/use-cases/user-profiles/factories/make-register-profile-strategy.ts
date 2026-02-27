import { err, ok, Result } from '@core/logic/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { UserRole } from '@prisma/client'
import {
  IProfileStrategyFactory,
  ProfileStrategyCreator,
} from '@tps/use-case/user-profiles/factories/profile-strategy-factory'
import { IProfileStrategy } from '@tps/use-case/user-profiles/strategies/profile-strategy.interface'
import { UserWithNoRoleError } from '@use-cases/errors/users/user-with-no-role-error'
import { makeRegisterPatientStrategy } from '../patients/factories/make-register-patient'
import { makeRegisterSupervisorDoctorStrategy } from '../supervisor-doctor/factories/make-register-supervisor-doctor-strategy'

const strategies: Record<UserRole, ProfileStrategyCreator> = {
  [UserRole.SUPERVISOR_DOCTOR]: (dbContext) => {
    return makeRegisterSupervisorDoctorStrategy(dbContext)
  },

  [UserRole.PATIENT]: (dbContext) => {
    return makeRegisterPatientStrategy(dbContext)
  },

  [UserRole.HEALTH_PROFESSIONAL]: () => {
    throw new Error('RegisterHealthProfessionalStrategy not implemented')
  },

  [UserRole.ADMIN]: () => {
    throw new Error('RegisterAdminStrategy not implemented')
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
