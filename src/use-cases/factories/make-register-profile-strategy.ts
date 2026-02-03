import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { UserRole } from '@prisma/client'
import { PrismaSupervisorDoctorRepository } from '@repositories/prisma/prisma-supervisor-doctor'
import { UserWithNoRoleError } from '@use-cases/errors/users/user-with-no-role-error'
import { RegisterHealthProfessionalStrategy } from '@use-cases/strategies/register-user-profile-strategy/register-health-professional-strategy'
import { RegisterProfileStrategy } from '@use-cases/strategies/register-user-profile-strategy/register-profile-strategy.interface'
import { RegisterSupervisorDoctorStrategy } from '@use-cases/strategies/register-user-profile-strategy/register-supervisor-doctor-strategy'

const strategies: Record<UserRole, (dbContext: DatabaseContext) => RegisterProfileStrategy> = {
  [UserRole.PATIENT]: () => {
    throw new Error('RegisterPatientStrategy not implemented')
  },

  // Ainda não implementado, mude conforme necessário
  [UserRole.HEALTH_PROFESSIONAL]: (dbContext) => new RegisterHealthProfessionalStrategy(dbContext),

  [UserRole.SUPERVISOR_DOCTOR]: (dbContext) => {
    const supervisorDoctorRepository = new PrismaSupervisorDoctorRepository(dbContext)
    return new RegisterSupervisorDoctorStrategy(supervisorDoctorRepository)
  },

  [UserRole.ADMIN]: () => {
    throw new Error('RegisterAdminStrategy not implemented')
  },
}

export function makeRegisterProfileStrategy(role: UserRole): RegisterProfileStrategy {
  const dbContext = new DatabaseContext()

  const strategyFactory = strategies[role]

  if (!strategyFactory) {
    throw new UserWithNoRoleError()
  }

  return strategyFactory(dbContext)
}
