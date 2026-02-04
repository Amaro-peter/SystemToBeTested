import { UserPresenter } from '@http/presenters/users/user-presenter'
import { UserProfilePresenterStrategy } from '@http/presenters/users/user-profile-presenter-strategy'
import { updateSchema } from '@http/schemas/users/update-schema'
import { logger } from '@lib/logger'
import { makeUpdateUserUseCase } from '@use-cases/factories/make-update-user-use-case'
import { DomainError } from '@core/domain/errors/domain-error'
import { ResourceNotFoundError } from '@use-cases/errors/resource-not-found-error'
import { UserAlreadyExistsError } from '@use-cases/errors/users/user-already-exists-error'
import { SupervisorDoctorAlreadyExistsError } from '@use-cases/errors/supervisor-doctor/supervisor-doctor-already-exists'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, cpf, phoneNumber, role, specificData } = updateSchema.parse(request.body)

  const updateUserUseCase = makeUpdateUserUseCase()

  const result = await updateUserUseCase.execute({
    publicId: request.user.sub,
    name,
    email,
    cpf,
    phoneNumber,
    specificData,
    role,
  })

  if (result.isLeft()) {
    const error = result.value

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof UserAlreadyExistsError || error instanceof SupervisorDoctorAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    if (error instanceof DomainError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }

  const { updatedUser, updatedUserProfile } = result.value

  logger.info('User updated successfully!')

  const response = {
    user: UserPresenter.toHTTP(updatedUser),
    userProfile: undefined as unknown,
  }

  if (updatedUserProfile) {
    const presenterStrategy = UserProfilePresenterStrategy.getStrategy(updatedUser.role)
    response.userProfile = presenterStrategy.present(updatedUserProfile)
  }

  return reply.status(200).send(response)
}
