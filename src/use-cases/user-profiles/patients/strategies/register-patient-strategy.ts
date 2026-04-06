import {
  CreatePatientPayload,
  IPatient,
  PatientRepository,
} from '@core/contracts/repositories/patient-repository.interface'
import { IUser } from '@core/contracts/repositories/users-repository.interface'
import { IUserProfileStrategy } from '@core/contracts/use-case/user-profiles/strategies/user-profile-strategy.interface'
import { err, ok, Result } from '@core/shared/result'

type PatientStrategyResponse = {
  patient: IPatient
}

export class RegisterPatientStrategy implements IUserProfileStrategy<PatientStrategyResponse> {
  constructor(private patientRepository: PatientRepository) {}

  async execute(user: IUser, data: unknown): Promise<Result<PatientStrategyResponse, Error>> {
    const patientData = data as CreatePatientPayload

    const patientResult = await this.patientRepository.create(user.id, {
      ...patientData,
    })

    if (patientResult.success === false) {
      return err(patientResult.error)
    }

    return ok({
      patient: patientResult.value,
    })
  }
}
