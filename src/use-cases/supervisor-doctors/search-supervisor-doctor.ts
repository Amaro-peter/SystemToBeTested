import { Result } from '@core/logic/result'
import {
  ISearchSupervisorDoctorFilters,
  ISupervisorDoctor,
  SupervisorDoctorRepository,
} from '@repositories/supervisor-doctor-respository'

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
