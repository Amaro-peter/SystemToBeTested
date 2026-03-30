import { UserRole } from '@prisma/client'
import {
  IProfileStrategyFactory,
  ProfileStrategyCreator,
} from '@core/contracts/use-case/user-profiles/factories/profile-strategy-factory.interface'
import { IProfileStrategy } from '@core/contracts/use-case/user-profiles/strategies/profile-strategy.interface'
import { err, ok, Result } from '@core/shared/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { UserWithNoRoleError } from '@use-cases/errors/users/user-with-no-role-error'
import { makeDeleteSupervisorDoctorStrategy } from '../supervisor-doctor/factories/make-delete-supervisor-doctor-strategy'

const strategies: Record<UserRole, ProfileStrategyCreator> = {
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

export class DeleteProfileStrategyFactory implements IProfileStrategyFactory {
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
