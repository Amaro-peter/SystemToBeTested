import { type Result } from '@core/logic/result'
import { SupervisorDoctor, User } from '@prisma/client'
import { SupervisorDoctorRepository } from '@repositories/supervisor-doctor-respository'
import { IErrorMapper } from '@tps/error-interfaces/error-mapper.interface'
import { handleRepositoryCall } from '@use-cases/common/handle-repository-call'
import { DeleteProfileStrategy } from '../../../@types/use-case/users/delete-profile-strategy.interface'

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
