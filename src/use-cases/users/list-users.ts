import { User } from '@prisma/client'
import { UserRepository } from '@core/contracts/repositories/users-repository'
import { Result } from '@core/shared/result'

interface ListUsersUseCaseRequest {
  page: number
  pageSize: number
}

type ListUsersUseCaseResponse = Result<User[], Error>

export class ListUsersUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({ page, pageSize }: ListUsersUseCaseRequest): Promise<ListUsersUseCaseResponse> {
    const users = await this.usersRepository.list(page, pageSize)

    return users
  }
}
