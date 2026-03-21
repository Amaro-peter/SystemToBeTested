import { Result } from '@core/logic/result'
import { ISupervisorDoctor, SupervisorDoctorRepository } from '@repositories/supervisor-doctor-respository'

interface ListSupervisorDoctorUseCaseRequest {
  page: number
  pageSize: number
}

type ListSupervisorDoctorUseCaseResponse = Result<ISupervisorDoctor[], Error>

export class ListSupervisorDoctorUseCase {
  constructor(private supervisorDoctorRepository: SupervisorDoctorRepository) {}

  async execute({ page, pageSize }: ListSupervisorDoctorUseCaseRequest): Promise<ListSupervisorDoctorUseCaseResponse> {
    const supervisorDoctorsResult = await this.supervisorDoctorRepository.list(page, pageSize)

    return supervisorDoctorsResult
  }
}
