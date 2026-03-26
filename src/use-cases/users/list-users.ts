import { User } from '@prisma/client'
import { Result } from '@core/logic/result'
import { UserRepository } from '@repositories/users-repository'

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
