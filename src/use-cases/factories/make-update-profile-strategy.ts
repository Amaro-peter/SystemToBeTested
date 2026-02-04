import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { UserRole } from '@prisma/client'
import { PrismaSupervisorDoctorRepository } from '@repositories/prisma/prisma-supervisor-doctor'
import { UserWithNoRoleError } from '@use-cases/errors/users/user-with-no-role-error'
import { UpdateRegisterProfileStrategy } from '@use-cases/strategies/update-user-profile-strategy/update-profile-strategy.interface'
import { UpdateSupervisorDoctorStrategy } from '@use-cases/strategies/update-user-profile-strategy/update-supervisor-doctor-strategy'

const strategies: Record<UserRole, (dbContext: DatabaseContext) => UpdateRegisterProfileStrategy> = {
  [UserRole.PATIENT]: () => {
    throw new Error('UpdatePatientStrategy not implemented')
  },

  // Ainda não implementado, mude conforme necessário
  [UserRole.HEALTH_PROFESSIONAL]: () => {
    throw new Error('UpdateHealthProfessionalStrategy not implemented')
  },

  [UserRole.SUPERVISOR_DOCTOR]: (dbContext) => {
    const supervisorDoctorRepository = new PrismaSupervisorDoctorRepository(dbContext)
    return new UpdateSupervisorDoctorStrategy(supervisorDoctorRepository)
  },

  [UserRole.ADMIN]: () => {
    throw new Error('UpdateAdminStrategy not implemented')
  },
}

export function makeUpdateProfileStrategy(role: UserRole): UpdateRegisterProfileStrategy {
  const dbContext = new DatabaseContext()

  const strategyFactory = strategies[role]

  if (!strategyFactory) {
    throw new UserWithNoRoleError()
  }

  return strategyFactory(dbContext)
}