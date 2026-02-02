import { env } from '@env/index'
import { Prisma, User, UserRole } from '@prisma/client'
import { UserRepository } from '@repositories/users-repository'
import { UserAlreadyExistsError } from '@use-cases/errors/users/user-already-exists-error'
import { UserCouldNotBeCreatedError } from '@use-cases/errors/users/user-could-not-be-created-error'
import { makeRegisterProfileStrategy } from '@use-cases/factories/make-register-profile-strategy'
import { hash } from 'bcryptjs'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  cpf: string
  phoneNumber: string
  password: string
  role: UserRole
  specificData: unknown
}

type RegisterUserUseCaseResponse = {
  user: User
  userProfile: unknown
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UserRepository) {}

  async execute({
    name,
    email,
    cpf,
    phoneNumber,
    password,
    role,
    specificData,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    try {
      const existingUser = await this.usersRepository.findByEmailOrCpf(email, cpf)

      if (existingUser) {
        throw new UserAlreadyExistsError()
      }

      const passwordHash = await hash(password, env.HASH_SALT_ROUNDS)

      const user = await this.usersRepository.create({
        name,
        email,
        cpf,
        phoneNumber,
        passwordHash,
        role,
      })

      if (!user) {
        throw new UserCouldNotBeCreatedError()
      }

      const userProfileStrategy = makeRegisterProfileStrategy(role)

      const userProfile = await userProfileStrategy.execute(user, specificData)

      return {
        user,
        userProfile,
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new UserAlreadyExistsError()
      }

      throw error
    }
  }
}

