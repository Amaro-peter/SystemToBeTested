import { UserRepository } from '@core/contracts/repositories/users-repository'
import { User } from '@prisma/client'
import { PrismaAuthenticationAuditsRepository } from '@repositories/prisma/prisma-authentication-audits-repository'
import { InvalidCredentialsError } from '@use-cases/errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { emailSchema } from 'schemas/utils/email'

interface AuthenticateUserUseCaseRequest {
  login: string
  password: string
}

type AuthenticateUserUseCaseResponse = {
  user: User
}

const DUMMY_HASH = '$2a$12$tlPzU0pvKy33GEnCkOCipeNJC1Ho4NHro4XwveiXUM5xChZj3ua9y'

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UserRepository,
    private authenticationAuditsRepository: PrismaAuthenticationAuditsRepository,
  ) {}

  async execute({ login, password }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    let user: User | null = null

    if (emailSchema.safeParse(login).success) {
      user = await this.usersRepository.findBy({ email: login })
    }

    const hashToCompare = user?.passwordHash || DUMMY_HASH

    const doesPasswordMatch = await compare(password, hashToCompare)

    if (!user) {
      await this.authenticationAuditsRepository.create({
        status: 'USER_NOT_EXISTS',
      })
      throw new InvalidCredentialsError()
    } else if (!doesPasswordMatch) {
      await this.authenticationAuditsRepository.create({
        //userId: user.id,  - não sei se é necessário
        status: 'INCORRECT_PASSWORD',
      })
      throw new InvalidCredentialsError()
    }

    /*await this.authenticationAuditsRepository.create({
      userId: user.id,
      status: 'SUCCESS',
    })*/

    //if (!user || !doesPasswordMatch) throw new InvalidCredentialsError()

    return { user }
  }
}
