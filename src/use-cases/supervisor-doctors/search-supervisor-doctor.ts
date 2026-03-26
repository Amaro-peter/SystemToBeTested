import {
  ISearchSupervisorDoctorFilters,
  ISupervisorDoctor,
  SupervisorDoctorRepository,
} from '@core/contracts/repositories/supervisor-doctor-respository'
import { Result } from '@core/shared/result'

interface ISearchSupervisorDoctorUseCaseRequest {
  filters: ISearchSupervisorDoctorFilters
  page: number
  pageSize: number
}

type SearchSupervisorDoctorResponse = Result<ISupervisorDoctor[], Error>

export class SearchSupervisorDoctorUseCase {
  constructor(private supervisorDoctorRepository: SupervisorDoctorRepository) {}

  async execute({
    filters,
    page,
    pageSize,
  }: ISearchSupervisorDoctorUseCaseRequest): Promise<SearchSupervisorDoctorResponse> {
    const result = await this.supervisorDoctorRepository.search(filters, page, pageSize)

    return result
  }
}
