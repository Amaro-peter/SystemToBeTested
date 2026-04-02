import { Patient, User } from '@prisma/client'
import { CreatePatientPayload, PatientRepository } from '@core/contracts/repositories/patient-repository'
import { IUserProfileStrategy } from '@core/contracts/use-case/user-profiles/strategies/user-profile-strategy.interface'
import { IValidator } from '@core/contracts/validation/validator.interface'
import { err, ok, Result } from '@core/shared/result'

type PatientStrategyResponse = {
  patient: Patient
}

export class RegisterPatientStrategy implements IUserProfileStrategy<PatientStrategyResponse> {
  constructor(
    private patientRepository: PatientRepository,
    private validator: IValidator<CreatePatientPayload>,
  ) {}

  async execute(user: User, payload: unknown): Promise<Result<PatientStrategyResponse, Error>> {
    const validationResult = this.validator.validate(payload)

    if (!validationResult.success) {
      return err(validationResult.error)
    }

    const specificData = validationResult.value

    const patientResult = await this.patientRepository.create(user.publicId, {
      ...specificData,
    })

    if (!patientResult.success) {
      return err(patientResult.error)
    }

    return ok({
      patient: patientResult.value,
    })
  }
}
