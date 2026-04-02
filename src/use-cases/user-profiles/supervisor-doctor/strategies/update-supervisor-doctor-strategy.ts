import { User } from '@prisma/client'
import {
  ISupervisorDoctor,
  SupervisorDoctorPayload,
  SupervisorDoctorRepository,
} from '@core/contracts/repositories/supervisor-doctor-respository.interface'
import { IUserProfileStrategy } from '@core/contracts/use-case/user-profiles/strategies/user-profile-strategy.interface'
import { IValidator } from '@core/contracts/validation/validator.interface'
import { filterUndefinedValues } from '@core/shared/filter-undefined-values'
import { ok, err, Result } from '@core/shared/result'

type SupervisorDoctorStrategyResponse = {
  supervisorDoctor: ISupervisorDoctor
}

export class UpdateSupervisorDoctorStrategy implements IUserProfileStrategy<SupervisorDoctorStrategyResponse> {
  constructor(
    private supervisorDoctorRepository: SupervisorDoctorRepository,
    private validator: IValidator<Partial<SupervisorDoctorPayload>>,
  ) {}

  async execute(updatedUser: User, payload: unknown): Promise<Result<SupervisorDoctorStrategyResponse, Error>> {
    const validationResult = this.validator.validate(payload)

    if (!validationResult.success) {
      return err(validationResult.error)
    }

    const updateData = filterUndefinedValues(validationResult.value)

    // Chamada direta ao repositório que retorna Result
    const supervisorDoctorResult = await this.supervisorDoctorRepository.update(updatedUser.id, updateData)

    if (!supervisorDoctorResult.success) {
      return err(supervisorDoctorResult.error)
    }

    return ok({
      supervisorDoctor: supervisorDoctorResult.value,
    })
  }
}
