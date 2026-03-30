import {
  IInstructor,
  InstructorRepository,
  ISearchInstructorFilters,
} from '@core/contracts/repositories/instructor-repository.interface'
import { Result } from '@core/shared/result'

interface ISearchInstructorUseCaseRequest {
  filters: ISearchInstructorFilters
  page: number
  pageSize: number
}

type SearchInstructorResponse = Result<IInstructor[], Error>

export class SearchInstructorUseCase {
  constructor(private instructorRepository: InstructorRepository) {}

  async execute({ filters, page, pageSize }: ISearchInstructorUseCaseRequest): Promise<SearchInstructorResponse> {
    const result = await this.instructorRepository.search(filters, page, pageSize)

    return result
  }
}
