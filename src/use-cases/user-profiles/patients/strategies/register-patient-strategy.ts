import { Patient, User } from '@prisma/client'
import { err, ok, Result } from '@core/logic/result'
import { CreatePatientPayload, PatientRepository } from '@repositories/patient-repository'
import { IProfileStrategy } from '@tps/use-case/user-profiles/strategies/profile-strategy.interface'
import { IValidator } from '@tps/validation/validator.interface'

type PatientStrategyResponse = {
  patient: Patient
}

export class RegisterPatientStrategy implements IProfileStrategy<PatientStrategyResponse> {
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
