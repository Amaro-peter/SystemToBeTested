import { ok, err, Result } from '@core/logic/result'
import { SupervisorDoctor, User } from '@prisma/client'
import { SupervisorDoctorRepository } from '@repositories/supervisor-doctor-respository'
import { IProfileStrategy } from '@tps/use-case/strategies/profile-strategy.interface'

type DeleteSupervisorDoctorStrategyResponse = {
  supervisorDoctor: SupervisorDoctor
}

export class DeleteSupervisorDoctorStrategy implements IProfileStrategy<DeleteSupervisorDoctorStrategyResponse> {
  constructor(private supervisorDoctorRepository: SupervisorDoctorRepository) {}

  async execute(user: User): Promise<Result<DeleteSupervisorDoctorStrategyResponse, Error>> {
    const result = await this.supervisorDoctorRepository.deactivateSupervisorDoctor(user.id)

    if (!result.success) {
      return err(result.error)
    }

    return ok({
      supervisorDoctor: result.value,
    })
  }
}
