import { UserProfilePresenter } from "../users/user-profile-presenter";
import { IUserProfileStrategy } from "./user-profile-presenter-strategy.interface";


export class DefaultUserProfilePresenterStrategy implements IUserProfileStrategy {
  present(userProfile: unknown): unknown {
    return UserProfilePresenter.toHTTP(userProfile)
  }
}
