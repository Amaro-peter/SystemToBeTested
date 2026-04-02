import { User } from '@prisma/client'
import {
  ISupervisorDoctor,
  SupervisorDoctorPayload,
  SupervisorDoctorRepository,
} from '@core/contracts/repositories/supervisor-doctor-respository.interface'
import { IUserProfileStrategy } from '@core/contracts/use-case/user-profiles/strategies/user-profile-strategy.interface'
import { IValidator } from '@core/contracts/validation/validator.interface'
import { ok, err, Result } from '@core/shared/result'

type SupervisorDoctorStrategyResponse = {
  supervisorDoctor: ISupervisorDoctor
}

export class RegisterSupervisorDoctorStrategy implements IUserProfileStrategy<SupervisorDoctorStrategyResponse> {
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
