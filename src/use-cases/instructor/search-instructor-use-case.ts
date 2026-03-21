import { Result } from '@core/logic/result'
import {
  IInstructor,
  InstructorRepository,
  ISearchInstructorFilters,
} from '@repositories/instructor-repository.interface'

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
