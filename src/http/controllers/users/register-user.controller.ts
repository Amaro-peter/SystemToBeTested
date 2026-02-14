import { HttpErrorMapper } from '@http/errors/http-error-mapper'
import { UserPresenter } from '@http/presenters/users/user-presenter'
import { UserProfilePresenterStrategy } from '@http/presenters/users/user-profile-presenter-strategy'
import { registerSchema } from '@http/schemas/users/register-schema'
import { logger } from '@lib/logger'
import { makeRegisterUserUseCase } from '@use-cases/factories/users/make-register-user-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, cpf, phoneNumber, role, password, specificData } = registerSchema.parse(request.body)

  const registerUserUseCase = makeRegisterUserUseCase()

  const result = await registerUserUseCase.execute({
    name,
    email,
    cpf,
    phoneNumber,
    password,
    role,
    specificData,
  })

  if (!result.success) {
    return HttpErrorMapper.map(result.error, reply)
  }

  const { user, userProfile } = result.value

  logger.info({ userId: user.publicId, role: user.role }, `User with role ${user.role} registered successfully!`)

  const response = {
    user: UserPresenter.toHTTP(user),
    userProfile: undefined as unknown,
  }

  if (userProfile) {
    const presenterStrategy = UserProfilePresenterStrategy.getStrategy(user.role)
    response.userProfile = presenterStrategy.present(userProfile)
  }

  return reply.status(201).send(response)
}
