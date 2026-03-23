import { Result } from '@core/logic/result'
import { User } from '@prisma/client'
import { ISearchUserFilters, UserRepository } from '@repositories/users-repository'

interface ISearchUsersUseCaseRequest {
  filters: ISearchUserFilters
  page: number
  pageSize: number
}

type SearchUsersResponse = Result<User[], Error>

export class SearchUsersUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({ filters, page, pageSize }: ISearchUsersUseCaseRequest): Promise<SearchUsersResponse> {
    const users = await this.usersRepository.search(filters, page, pageSize)

    return users
  }
}
