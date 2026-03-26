import { User } from '@prisma/client'
import { ok, err, Result } from '@core/logic/result'
import { ISupervisorDoctor, SupervisorDoctorRepository } from '@repositories/supervisor-doctor-respository'
import { IProfileStrategy } from '@tps/use-case/user-profiles/strategies/profile-strategy.interface'

type DeleteSupervisorDoctorStrategyResponse = {
  supervisorDoctor: ISupervisorDoctor
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
