import { UserRole } from "@prisma/client"
import { UserWithNoRoleError } from "@use-cases/errors/users/user-with-no-role-error"
import { RegisterHealthProfessionalStrategy } from "@use-cases/strategies/register-health-professional-strategy"
import { RegisterProfileStrategy } from "@use-cases/strategies/register-profile-strategy.interface"

const strategies: Record<UserRole, () => RegisterProfileStrategy> = {
  [UserRole.PATIENT]: () => {
    throw new Error('RegisterPatientStrategy not implemented')
  },

  // Ainda não implementado, mude conforme necessário
  [UserRole.HEALTH_PROFESSIONAL]: () => new RegisterHealthProfessionalStrategy(),

  [UserRole.SUPERVISOR_DOCTOR]: () => {
    throw new Error('RegisterSupervisorDoctorStrategy not implemented')
  },

  [UserRole.ADMIN]: () => {
    throw new Error('RegisterAdminStrategy not implemented')
  },
}

export function makeRegisterProfileStrategy(role: UserRole): RegisterProfileStrategy {
  const strategyFactory = strategies[role]

  if(!strategyFactory) {
     throw new UserWithNoRoleError()
  }

  return strategyFactory()
}