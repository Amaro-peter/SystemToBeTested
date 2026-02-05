import { SupervisorDoctor, User } from '@prisma/client'
import { type Result } from '@core/logic/result-pattern'
import { SupervisorDoctorRepository } from '@repositories/supervisor-doctor-respository'
import { IErrorMapper } from '@core/domain/errors/error-mappers/error-mapper.interface'
import { DeleteProfileStrategy } from './delete-profile-strategy.interface'
import { handleRepositoryCall } from '@use-cases/common/handle-repository-call'

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
