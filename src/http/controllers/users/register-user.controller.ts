import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserPresenter } from '@http/presenters/users/user-presenter'
import { UserProfilePresenter } from '@http/presenters/users/user-profile-presenter'
import { logger } from '@lib/logger'
import { makeRegisterUserUseCase } from '@use-cases/users/factories/make-register-user-use-case'
import { HttpErrorMapper } from 'errors/http/http-error-mapper'
import { registerSchema } from 'schemas/http/users/register-schema'

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
    response.userProfile = UserProfilePresenter.toHTTP(userProfile)
  }

  return reply.status(201).send(response)
}
