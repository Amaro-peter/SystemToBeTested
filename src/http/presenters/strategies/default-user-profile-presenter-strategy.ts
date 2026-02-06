import { IUserProfileStrategy } from './user-profile-presenter-strategy.interface'
import { UserProfilePresenter } from '../users/user-profile-presenter'

export class DefaultUserProfilePresenterStrategy implements IUserProfileStrategy {
  present(userProfile: unknown): unknown {
    return UserProfilePresenter.toHTTP(userProfile)
  }
}
