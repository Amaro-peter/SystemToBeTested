import { err, ok, Result } from '@core/logic/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { UserRole } from '@prisma/client'
import { RegisterProfileStrategy } from '@tps/use-case/users/register-profile-strategy.interface'
import { UserWithNoRoleError } from '@use-cases/errors/users/user-with-no-role-error'
import { RegisterSupervisorDoctorStrategy } from '@use-cases/strategies/register-user-profile-strategy/register-supervisor-doctor-strategy'
import { makeRegisterSupervisorDoctorStrategy } from '../supervisor-doctor/make-register-supervisor-doctor-strategy'

const strategies: Record<UserRole, (dbContext: DatabaseContext) => RegisterProfileStrategy> = {
  [UserRole.PATIENT]: () => {
    throw new Error('RegisterPatientStrategy not implemented')
  },

  // Ainda não implementado, mude conforme necessário
  [UserRole.HEALTH_PROFESSIONAL]: () => {
    throw new Error('RegisterHealthProfessionalStrategy not implemented')
  },

  [UserRole.SUPERVISOR_DOCTOR]: (dbContext) => {
    const { supervisorDoctorRepository, validator, errorMapper } = makeRegisterSupervisorDoctorStrategy(dbContext)
    return new RegisterSupervisorDoctorStrategy(supervisorDoctorRepository, validator, errorMapper)
  },

  [UserRole.ADMIN]: () => {
    throw new Error('RegisterAdminStrategy not implemented')
  },
}

export function makeRegisterProfileStrategy(
  role: UserRole,
  dbContext: DatabaseContext,
): Result<RegisterProfileStrategy, Error> {
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
