import { User } from '@prisma/client'
import { ok, err, Result } from '@core/logic/result'
import { filterUndefinedValues } from '@core/shared/filter-undefined-values'
import {
  ISupervisorDoctor,
  SupervisorDoctorPayload,
  SupervisorDoctorRepository,
} from '@repositories/supervisor-doctor-respository'
import { IProfileStrategy } from '@tps/use-case/user-profiles/strategies/profile-strategy.interface'
import { IValidator } from '@tps/validation/validator.interface'

type SupervisorDoctorStrategyResponse = {
  supervisorDoctor: ISupervisorDoctor
}

export class UpdateSupervisorDoctorStrategy implements IProfileStrategy<SupervisorDoctorStrategyResponse> {
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
