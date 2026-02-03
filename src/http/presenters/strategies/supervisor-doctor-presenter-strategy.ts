import { SupervisorDoctor } from "@prisma/client"
import { SupervisorDoctorPresenterRule } from "../rules/supervisor-doctor-presenter-rule"
import { UserProfilePresenter } from "../users/user-profile-presenter"
import { IUserProfileStrategy } from "./user-profile-presenter-strategy.interface"


export class SupervisorDoctorPresenterStrategy implements IUserProfileStrategy {
  present(userProfile: unknown): unknown {
    return UserProfilePresenter.toHTTP(userProfile as SupervisorDoctor, SupervisorDoctorPresenterRule)
  }
}
