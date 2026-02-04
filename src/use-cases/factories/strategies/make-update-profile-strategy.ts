import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { UserRole } from '@prisma/client'
import { UserWithNoRoleError } from '@use-cases/errors/users/user-with-no-role-error'
import { UpdateProfileStrategy } from '@use-cases/strategies/update-user-profile-strategy/update-profile-strategy.interface'
import { UpdateSupervisorDoctorStrategy } from '@use-cases/strategies/update-user-profile-strategy/update-supervisor-doctor-strategy'
import { makeUpdateSupervisorDoctorStrategy } from './make-update-supervisor-doctor-strategy'

const strategies: Record<UserRole, (dbContext: DatabaseContext) => UpdateProfileStrategy> = {
  [UserRole.PATIENT]: () => {
    throw new Error('UpdatePatientStrategy not implemented')
  },

  // Ainda não implementado, mude conforme necessário
  [UserRole.HEALTH_PROFESSIONAL]: () => {
    throw new Error('UpdateHealthProfessionalStrategy not implemented')
  },

  [UserRole.SUPERVISOR_DOCTOR]: (dbContext) => {
    const {
      supervisorDoctorRepository, 
      validator, 
      errorMapper, 
    } = makeUpdateSupervisorDoctorStrategy(dbContext)

    return new UpdateSupervisorDoctorStrategy(supervisorDoctorRepository, validator, errorMapper)
  },

  [UserRole.ADMIN]: () => {
    throw new Error('UpdateAdminStrategy not implemented')
  },
}

export function makeUpdateProfileStrategy(role: UserRole, dbContext: DatabaseContext): UpdateProfileStrategy {

  const strategyFactory = strategies[role]

  if (!strategyFactory) {
    throw new UserWithNoRoleError()
  }

  return strategyFactory(dbContext)
}
