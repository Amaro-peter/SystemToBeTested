import {
  ISupervisorDoctor,
  SupervisorDoctorPayload,
  SupervisorDoctorRepository,
} from '@core/contracts/repositories/supervisor-doctor-respository'
import { IProfileStrategy } from '@core/contracts/use-case/user-profiles/strategies/profile-strategy.interface'
import { IValidator } from '@core/contracts/validation/validator.interface'
import { ok, err, Result } from '@core/shared/result'
import { User } from '@prisma/client'

type SupervisorDoctorStrategyResponse = {
  supervisorDoctor: ISupervisorDoctor
}

export class RegisterSupervisorDoctorStrategy implements IProfileStrategy<SupervisorDoctorStrategyResponse> {
  constructor(
    private supervisorDoctorRepository: SupervisorDoctorRepository,
    private validator: IValidator<SupervisorDoctorPayload>,
  ) {}

  async execute(user: User, payload: unknown): Promise<Result<SupervisorDoctorStrategyResponse, Error>> {
    const validationResult = this.validator.validate(payload)

    if (!validationResult.success) {
      return err(validationResult.error)
    }

    const specificData = validationResult.value

    const supervisorDoctorResult = await this.supervisorDoctorRepository.create(user.publicId, {
      ...specificData,
    })

    if (!supervisorDoctorResult.success) {
      return err(supervisorDoctorResult.error)
    }

    return ok({
      supervisorDoctor: supervisorDoctorResult.value,
    })
  }
}
