import {
  ISupervisorDoctor,
  SupervisorDoctorRepository,
} from '@core/contracts/repositories/supervisor-doctor-respository'
import { Result } from '@core/shared/result'

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
