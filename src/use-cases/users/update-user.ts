import { DomainError } from '@core/domain/errors/domain-error'
import { IErrorMapper } from '@core/domain/errors/error-mappers/error-mapper.interface'
import { err, ok, Result } from '@core/logic/result-pattern'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { User, UserRole } from '@prisma/client'
import { UserRepository } from '@repositories/users-repository'
import { ResourceNotFoundError } from '@use-cases/errors/resource-not-found-error'
import { UserAlreadyExistsError } from '@use-cases/errors/users/user-already-exists-error'
import { makeUpdateProfileStrategy } from '@use-cases/factories/strategies/make-update-profile-strategy'

interface UpdateUserUseCaseRequest {
  publicId: string
  name?: string
  email?: string
  cpf?: string
  role: UserRole
  phoneNumber?: string
  specificData?: unknown
}

type UpdateUserUseCaseResponse = Result<
  {
    updatedUser: User
    updatedUserProfile?: unknown
  },
  DomainError
>

export class UpdateUserUseCase {
  constructor(
    private usersRepository: UserRepository,
    private dbContext: DatabaseContext,
    private userErrorMapper: IErrorMapper,
  ) {}

  async execute(request: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    try {
      await this.validateUserUniqueness(request.publicId, request.email, request.cpf)

      return await this.dbContext.runInTransaction(async () => {
        const updatedUser = await this.updateUserEntity(request.publicId, {
          name: request.name,
          email: request.email,
          cpf: request.cpf,
          phoneNumber: request.phoneNumber,
        })

        if (!request.specificData) {
          return ok({ updatedUser })
        }

        const profileResult = await this.updateUserProfile(
          updatedUser,
          request.role,
          request.specificData,
          this.dbContext,
        )

        if (!profileResult.success) {
          return err(profileResult.error)
        }

        return ok({
          updatedUser,
          updatedUserProfile: profileResult.value,
        })
      })
    } catch (error) {
      if (error instanceof DomainError) {
        return err(error)
      }
      throw error
    }
  }

  private async validateUserUniqueness(publicId: string, email?: string, cpf?: string): Promise<void> {
    const existingUser = email
      ? await this.usersRepository.findBy({ email })
      : cpf
        ? await this.usersRepository.findBy({ cpf })
        : null

    if (existingUser && existingUser.publicId !== publicId) {
      throw new UserAlreadyExistsError()
    }
  }

  private async updateUserEntity(
    publicId: string,
    data: {
      name?: string
      email?: string
      cpf?: string
      phoneNumber?: string
    },
  ): Promise<User> {
    try {
      const updatedUser = await this.usersRepository.update(publicId, data)

      if (!updatedUser) {
        throw new ResourceNotFoundError()
      }

      return updatedUser
    } catch (error) {
      const domainError = this.userErrorMapper.mapToDomainError(error)

      if (domainError instanceof DomainError) {
        throw domainError
      }

      throw error
    }
  }

  private async updateUserProfile(
    updatedUser: User,
    role: UserRole,
    specificData: unknown,
    dbContext: DatabaseContext,
  ) {
    const updateProfileStrategy = makeUpdateProfileStrategy(role, dbContext)
    return await updateProfileStrategy.execute(updatedUser, specificData)
  }
}