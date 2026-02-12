import { err, Result } from '@core/logic/result-pattern'
import { SupervisorDoctor, User } from '@prisma/client'
import { SupervisorDoctorRepository } from '@repositories/supervisor-doctor-respository'
import { IErrorMapper } from '@tps/error-interfaces/error-mapper.interface'
import { IValidator } from '@tps/validation/validator.interface'
import { handleRepositoryCall } from '@use-cases/common/handle-repository-call'
import { RegisterProfileStrategy } from '../../../@types/use-case/users/register-profile-strategy.interface'

type SupervisorDoctorStrategyResponse = {
  supervisorDoctor: SupervisorDoctor
}

type SupervisorDoctorPayload = {
  crm: string
}

export class RegisterSupervisorDoctorStrategy implements RegisterProfileStrategy<SupervisorDoctorStrategyResponse> {
  constructor(
    private supervisorDoctorRepository: SupervisorDoctorRepository,
    private validator: IValidator<SupervisorDoctorPayload>,
    private errorMapper: IErrorMapper,
  ) {}

  async execute(user: User, payload: unknown): Promise<Result<SupervisorDoctorStrategyResponse, Error>> {
    const validationResult = this.validator.validate(payload)

    if (!validationResult.success) {
      return err(validationResult.error)
    }

    const specificData = validationResult.value

    return await handleRepositoryCall(this.errorMapper, async () => {
      const supervisorDoctor = await this.supervisorDoctorRepository.create(user.publicId, {
        crm: specificData.crm,
      })

      return {
        supervisorDoctor,
      }
    })
  }
}
