import { Result } from '@core/logic/result'
import { IInstructor, InstructorRepository } from '@repositories/instructor-repository.interface'

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
