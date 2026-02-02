import { UserPresenter } from '@http/presenters/user-presenter'
import { registerSchema } from '@http/schemas/users/register-schema'
import { logger } from '@lib/logger'
import { UserAlreadyExistsError } from '@use-cases/errors/users/user-already-exists-error'
import { makeRegisterUserUseCase } from '@use-cases/factories/make-register-user-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, email, cpf, phoneNumber, role, password, specificData } = registerSchema.parse(request.body)

    const registerUseCase = makeRegisterUserUseCase()

    const { user, userProfile } = await registerUseCase.execute({
      name,
      email,
      cpf,
      phoneNumber,
      password,
      role,
      specificData,
    })

    logger.info({ userId: user.publicId, role: user.role }, `User with role:${user.role} registered successfully!`)

    reply.status(201).send({ user: UserPresenter.toHTTP(user), userProfile })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}

/*export async function registerAdmin(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { name, email, cpf, password } = registerSchema.parse(request.body)

    const registerUseCase = makeRegisterUserUseCase()

    const { user } = await registerUseCase.execute({ name, email, cpf, password, role: UserRole.ADMIN })

    return reply.status(201).send({ user: UserPresenter.toHTTP(user) })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }
}*/
