import { IInstructor, InstructorRepository } from '@core/contracts/repositories/instructor-repository.interface'
import { Result } from '@core/shared/result'

interface ListInstructorUseCaseRequest {
  page: number
  pageSize: number
}

type ListInstructorUseCaseResponse = Result<IInstructor[], Error>

export class ListInstructorUseCase {
  constructor(private instructorRepository: InstructorRepository) {}

  async execute({ page, pageSize }: ListInstructorUseCaseRequest): Promise<ListInstructorUseCaseResponse> {
    const instructorsResult = await this.instructorRepository.list(page, pageSize)

    return instructorsResult
  }
}
