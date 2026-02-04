import { UserPresenter } from '@http/presenters/users/user-presenter'
import { UserProfilePresenterStrategy } from '@http/presenters/users/user-profile-presenter-strategy'
import { registerSchema } from '@http/schemas/users/register-schema'
import { logger } from '@lib/logger'
import { SupervisorDoctorAlreadyExistsError } from '@use-cases/errors/supervisor-doctor/supervisor-doctor-already-exists'
import { SupervisorDoctorCouldNotBeCreatedError } from '@use-cases/errors/supervisor-doctor/supervisor-doctor-could-not-be-created'
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

    logger.info({ userId: user.publicId, role: user.role }, `User with role ${user.role} registered successfully!`)

    const presenterStrategy = UserProfilePresenterStrategy.getStrategy(user.role)

    reply.status(201).send({
      user: UserPresenter.toHTTP(user),
      userProfile: presenterStrategy.present(userProfile),
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    if (error instanceof SupervisorDoctorCouldNotBeCreatedError) {
      return reply.status(500).send({ message: error.message })
    }

    if (error instanceof SupervisorDoctorAlreadyExistsError) {
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
