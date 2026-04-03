import { IInstructor } from '@core/contracts/repositories/instructor-repository.interface'
import { IUserHTTP, UserPresenter, UserWithRelations } from '../users/user-presenter'

export class InstructorPresenter {
  static toHTTP(input: IInstructor | IInstructor[]): IUserHTTP | IUserHTTP[] {
    if (Array.isArray(input)) {
      return input.map((item) => this.toHTTP(item) as IUserHTTP)
    }

    const unifiedEntity = {
      ...input.user,
      instructor: {
        publicId: input.publicId,
        registration: input.registration,
        speciality: input.speciality,
      },
    } as unknown as UserWithRelations

    return UserPresenter.toHTTP(unifiedEntity)
  }
}
