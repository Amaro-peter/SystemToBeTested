import { IInstructor } from '@core/contracts/repositories/instructor-repository.interface'
import { IUserHTTP, UserPresenter } from '../users/user-presenter'

interface IInstructorHTTP {
  publicId: string
  registration: string
  speciality: string
  user?: IUserHTTP
}

export class InstructorPresenter {
  static toHTTP(input: IInstructor | IInstructor[]): IInstructorHTTP | IInstructorHTTP[] {
    if (Array.isArray(input)) {
      return input.map((item) => this.toHTTP(item) as IInstructorHTTP)
    }

    return {
      publicId: input.publicId,
      registration: input.registration,
      speciality: input.speciality,
      user: input.user ? UserPresenter.toHTTP(input.user) : undefined,
    }
  }
}
