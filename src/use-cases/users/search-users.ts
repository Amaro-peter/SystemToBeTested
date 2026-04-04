import { ISearchUserFilters, IUser, UserRepository } from '@core/contracts/repositories/users-repository.interface'
import { Result } from '@core/shared/result'

interface ISearchUsersUseCaseRequest {
  filters: ISearchUserFilters
  page: number
  pageSize: number
}

type SearchUsersResponse = Result<IUser[], Error>

export class SearchUsersUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({ filters, page, pageSize }: ISearchUsersUseCaseRequest): Promise<SearchUsersResponse> {
    const users = await this.usersRepository.search(filters, page, pageSize)

    return users
  }
}
