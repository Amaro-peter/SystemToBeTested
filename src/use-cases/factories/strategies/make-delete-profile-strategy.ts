import { err, ok, Result } from '@core/logic/result-pattern'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { UserRole } from '@prisma/client'
import { UserWithNoRoleError } from '@use-cases/errors/users/user-with-no-role-error'
import { DeleteProfileStrategy } from '@use-cases/strategies/delete-user-profile-strategy/delete-profile-strategy.interface'
import { DeleteSupervisorDoctorStrategy } from '@use-cases/strategies/delete-user-profile-strategy/delete-supervisor-doctor-strategy'
import { makeDeleteSupervisorDoctorStrategy } from '../supervisor-doctor/make-delete-supervisor-doctor-strategy'

const strategies: Record<UserRole, (dbContext: DatabaseContext) => DeleteProfileStrategy> = {
  [UserRole.PATIENT]: () => {
    throw new Error('DeletePatientStrategy not implemented')
  },

  // Ainda não implementado, mude conforme necessário
  [UserRole.HEALTH_PROFESSIONAL]: () => {
    throw new Error('DeleteHealthProfessionalStrategy not implemented')
  },

  [UserRole.SUPERVISOR_DOCTOR]: (dbContext) => {
    const { supervisorDoctorRepository, errorMapper } = makeDeleteSupervisorDoctorStrategy(dbContext)

    return new DeleteSupervisorDoctorStrategy(supervisorDoctorRepository, errorMapper)
  },

  [UserRole.ADMIN]: () => {
    throw new Error('DeleteAdminStrategy not implemented')
  },
}

export function makeDeleteProfileStrategy(
  role: UserRole,
  dbContext: DatabaseContext,
): Result<DeleteProfileStrategy, Error> {
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
