import { ok, err, Result } from '@core/logic/result'
import { SupervisorDoctor, User } from '@prisma/client'
import { SupervisorDoctorPayload, SupervisorDoctorRepository } from '@repositories/supervisor-doctor-respository'
import { IProfileStrategy } from '@tps/use-case/strategies/profile-strategy.interface'
import { IValidator } from '@tps/validation/validator.interface'

type SupervisorDoctorStrategyResponse = {
  supervisorDoctor: SupervisorDoctor
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
