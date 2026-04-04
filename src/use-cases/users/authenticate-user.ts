import { compare } from 'bcryptjs'
import {
  AuthenticationAuditsRepository,
  EnumAuthenticationStatus,
} from '@core/contracts/repositories/authentication-audits-repository.interface'
import { IUser, UserRepository } from '@core/contracts/repositories/users-repository.interface'
import { err, ok, Result } from '@core/shared/result'
import { logger } from '@lib/logger'
import { UserAlreadyDeactivatedError } from '@use-cases/errors/users/user-already-deactivated-error'
import { UserNotFoundError } from '@use-cases/errors/users/user-not-found-error'
import { UserOperationFailedError } from '@use-cases/errors/users/user-operation-failed-error'
import { UserWithWrongPasswordError } from '@use-cases/errors/users/user-wrong-password-error'

interface AuthenticateUserUseCaseRequest {
  login: string
  password: string
  ipAddress: string
  remotePort?: string
  userAgent?: string
  origin?: string
}

type AuthenticateUserUseCaseResponse = Result<
  {
    user: IUser
  },
  Error
>

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UserRepository,
    private authenticationAuditsRepository: AuthenticationAuditsRepository,
  ) {}

  async execute({
    login,
    password,
    ipAddress,
    remotePort,
    userAgent,
    origin,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const userResult = await this.usersRepository.findByEmailWithProfile(login)

    if (userResult.success === false) {
      if (userResult.error instanceof UserNotFoundError) {
        const authenticationAuditResult = await this.authenticationAuditsRepository.create({
          ipAddress,
          remotePort,
          userAgent,
          origin,
          status: EnumAuthenticationStatus.USER_NOT_EXISTS,
        })

        if (authenticationAuditResult.success === false) {
          logger.error(
            {
              authenticationAuditError: authenticationAuditResult.error,
              authenticationAuditStatus: EnumAuthenticationStatus.USER_NOT_EXISTS,
              ipAddress,
              origin,
              remotePort,
              userAgent,
            },
            'Failed to create authentication audit for non-existent user',
          )

          return err(new UserOperationFailedError())
        }
      }

      return err(userResult.error)
    }

    const user = userResult.value

    if (user.isActive === false) {
      const authenticationAuditResult = await this.authenticationAuditsRepository.create({
        ipAddress,
        remotePort,
        userAgent,
        origin,
        status: EnumAuthenticationStatus.BLOCKED,
      })

      if (authenticationAuditResult.success === false) {
        logger.error(
          {
            authenticationAuditError: authenticationAuditResult.error,
            authenticationAuditStatus: EnumAuthenticationStatus.BLOCKED,
            ipAddress,
            origin,
            remotePort,
            userAgent,
          },
          'Failed to create authentication audit for blocked or deactivated user',
        )

        return err(new UserOperationFailedError())
      }

      return err(new UserAlreadyDeactivatedError())
    }

    const doesPasswordMatch = await compare(password, user.passwordHash)

    if (!doesPasswordMatch) {
      const authenticationAuditResult = await this.authenticationAuditsRepository.create({
        userId: user.id,
        ipAddress,
        remotePort,
        userAgent,
        origin,
        status: EnumAuthenticationStatus.INCORRECT_PASSWORD,
      })

      if (authenticationAuditResult.success === false) {
        logger.error(
          {
            authenticationAuditError: authenticationAuditResult.error,
            authenticationAuditStatus: EnumAuthenticationStatus.INCORRECT_PASSWORD,
            ipAddress,
            origin,
            remotePort,
            userAgent,
          },
          'Failed to create authentication audit for incorrect password attempt',
        )

        return err(new UserOperationFailedError())
      }

      return err(new UserWithWrongPasswordError())
    }

    const authenticationAuditResult = await this.authenticationAuditsRepository.create({
      userId: user.id,
      ipAddress,
      remotePort,
      userAgent,
      origin,
      status: EnumAuthenticationStatus.SUCCESS,
    })

    if (authenticationAuditResult.success === false) {
      logger.error(
        {
          authenticationAuditError: authenticationAuditResult.error,
          authenticationAuditStatus: EnumAuthenticationStatus.SUCCESS,
          ipAddress,
          origin,
          remotePort,
          userAgent,
        },
        'Failed to create authentication audit for successful authentication',
      )
      return err(new UserOperationFailedError())
    }

    return ok({ user })
  }
}
