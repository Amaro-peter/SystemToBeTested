import { err, ok, Result } from '@core/logic/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { UserRole } from '@prisma/client'
import { IProfileStrategy } from '@tps/use-case/strategies/profile-strategy.interface'
import { UserWithNoRoleError } from '@use-cases/errors/users/user-with-no-role-error'
import { UpdateSupervisorDoctorStrategy } from '@use-cases/strategies/update-user-profile-strategy/update-supervisor-doctor-strategy'
import { makeUpdateSupervisorDoctorStrategy } from '../supervisor-doctor/make-update-supervisor-doctor-strategy'

const strategies: Record<UserRole, (dbContext: DatabaseContext) => IProfileStrategy> = {
  [UserRole.PATIENT]: () => {
    throw new Error('UpdatePatientStrategy not implemented')
  },

  // Ainda não implementado, mude conforme necessário
  [UserRole.HEALTH_PROFESSIONAL]: () => {
    throw new Error('UpdateHealthProfessionalStrategy not implemented')
  },

  [UserRole.SUPERVISOR_DOCTOR]: (dbContext) => {
    const { supervisorDoctorRepository, validator, errorMapper } = makeUpdateSupervisorDoctorStrategy(dbContext)

    return new UpdateSupervisorDoctorStrategy(supervisorDoctorRepository, validator, errorMapper)
  },

  [UserRole.ADMIN]: () => {
    throw new Error('UpdateAdminStrategy not implemented')
  },
}

export function makeUpdateProfileStrategy(role: UserRole, dbContext: DatabaseContext): Result<IProfileStrategy, Error> {
  const strategyFactory = strategies[role]

  if (!strategyFactory) {
    return err(new UserWithNoRoleError())
  }

  try {
    const strategy = strategyFactory(dbContext)
    return ok(strategy)
  } catch (error) {
    return err(error)
  }
}
