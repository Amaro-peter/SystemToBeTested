import { IErrorMapper } from '@core/domain/errors/error-mappers/error-mapper.interface'
import { type Result } from '@core/logic/result-pattern'
import { SupervisorDoctor, User } from '@prisma/client'
import { SupervisorDoctorRepository } from '@repositories/supervisor-doctor-respository'
import { handleRepositoryCall } from '@use-cases/common/handle-repository-call'
import { DeleteProfileStrategy } from './delete-profile-strategy.interface'

type SupervisorDoctorStrategyResponse = {
  supervisorDoctor: SupervisorDoctor
}

export class DeleteSupervisorDoctorStrategy implements DeleteProfileStrategy<SupervisorDoctorStrategyResponse> {
  constructor(
    private supervisorDoctorRepository: SupervisorDoctorRepository,
    private errorMapper: IErrorMapper,
  ) {}

  async execute(deactivatedUser: User): Promise<Result<SupervisorDoctorStrategyResponse, Error>> {
    return await handleRepositoryCall(this.errorMapper, async () => {
      const supervisorDoctor = await this.supervisorDoctorRepository.deactivateSupervisorDoctor(deactivatedUser.id)

      return {
        supervisorDoctor,
      }
    })
  }
}
