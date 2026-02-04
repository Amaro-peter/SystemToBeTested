import { DomainError } from '@core/domain/errors/domain-error'
import { left, ResultPattern, right } from '@core/logic/result-pattern'
import { logger } from '@lib/logger'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { Prisma, User, UserRole } from '@prisma/client'
import { UserRepository } from '@repositories/users-repository'
import { ResourceNotFoundError } from '@use-cases/errors/resource-not-found-error'
import { UserAlreadyExistsError } from '@use-cases/errors/users/user-already-exists-error'
import { UserCouldNotBeUpdatedError } from '@use-cases/errors/users/user-could-not-be-updated-error'
import { makeUpdateProfileStrategy } from '@use-cases/factories/make-update-profile-strategy'

interface UpdateUserUseCaseRequest {
  publicId: string
  name?: string
  email?: string
  cpf?: string
  role: UserRole
  phoneNumber?: string
  specificData?: unknown
}

type UpdateUserUseCaseResponse = ResultPattern<
  DomainError,
  {
    updatedUser: User
    updatedUserProfile?: unknown
  }
>

export class UpdateUserUseCase {
  constructor(
    private usersRepository: UserRepository,
    private dbContext: DatabaseContext,
  ) {}

  async execute({
    publicId,
    name,
    email,
    cpf,
    role,
    phoneNumber,
    specificData,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    try {
      const existingUser = email
        ? await this.usersRepository.findBy({ email })
        : cpf
          ? await this.usersRepository.findBy({ cpf })
          : null

      if (existingUser && existingUser.publicId !== publicId) {
        throw new UserAlreadyExistsError()
      }

      return await this.dbContext.runInTransaction(async () => {
        let updatedUser: User | null = null

        try {
          updatedUser = await this.usersRepository.update(publicId, {
            name,
            email,
            cpf,
            phoneNumber,
          })
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') throw new UserAlreadyExistsError()
            if (error.code === 'P2025') throw new UserCouldNotBeUpdatedError()
          }
          throw error
        }

        if (!updatedUser) {
          throw new ResourceNotFoundError()
        }

        if (!specificData) {
          return right({
            updatedUser,
          })
        }

        const updateProfileStrategy = makeUpdateProfileStrategy(role)

        const strategyResult = await updateProfileStrategy.execute(updatedUser, specificData)

        if (strategyResult.isLeft()) {
          throw strategyResult.value
        }

        return right({
          updatedUser,
          updatedUserProfile: strategyResult.value,
        })
      })
    } catch (error) {
      if (error instanceof DomainError) {
        return left(error)
      }

      throw error
    }
  }
}
