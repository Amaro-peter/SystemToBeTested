import { err, type Result } from '@core/logic/result'
import { SupervisorDoctor, User } from '@prisma/client'
import { SupervisorDoctorPayload, SupervisorDoctorRepository } from '@repositories/supervisor-doctor-respository'
import { IErrorMapper } from '@tps/error-interfaces/error-mapper.interface'
import { IProfileStrategy } from '@tps/use-case/strategies/profile-strategy.interface'
import { IValidator } from '@tps/validation/validator.interface'
import { handleRepositoryCall } from '@use-cases/common/handle-repository-call'
import { filterUndefinedValues } from '@utils/filter-undefined-values'

type SupervisorDoctorStrategyResponse = {
  supervisorDoctor: SupervisorDoctor
}

export class UpdateSupervisorDoctorStrategy implements IProfileStrategy<SupervisorDoctorStrategyResponse> {
  constructor(
    private supervisorDoctorRepository: SupervisorDoctorRepository,
    private validator: IValidator<Partial<SupervisorDoctorPayload>>,
    private errorMapper: IErrorMapper,
  ) {}

  async execute(updatedUser: User, payload: unknown): Promise<Result<SupervisorDoctorStrategyResponse, Error>> {
    const validationResult = this.validator.validate(payload)

    if (!validationResult.success) {
      return err(validationResult.error)
    }

    const updateData = filterUndefinedValues(validationResult.value)

    return await handleRepositoryCall(this.errorMapper, async () => {
      const supervisorDoctor = await this.supervisorDoctorRepository.update(updatedUser.id, updateData)

      return {
        supervisorDoctor,
      }
    })
  }
}
