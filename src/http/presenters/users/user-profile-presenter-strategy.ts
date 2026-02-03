import { UserRole } from "@prisma/client"
import { DefaultUserProfilePresenterStrategy } from "../strategies/default-user-profile-presenter-strategy"
import { SupervisorDoctorPresenterStrategy } from "../strategies/supervisor-doctor-presenter-strategy"
import { IUserProfileStrategy } from "../strategies/user-profile-presenter-strategy.interface"

export class UserProfilePresenterStrategy {
  private static strategies: Record<string, IUserProfileStrategy> = {
    [UserRole.SUPERVISOR_DOCTOR]: new SupervisorDoctorPresenterStrategy(),
  }

  static getStrategy(role: string): IUserProfileStrategy {
    return this.strategies[role] || new DefaultUserProfilePresenterStrategy()
  }
}
