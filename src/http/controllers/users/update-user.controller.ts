import { HttpErrorMapper } from '@http/errors/http-error-mapper'
import { UserPresenter } from '@http/presenters/users/user-presenter'
import { UserProfilePresenterStrategy } from '@http/presenters/users/user-profile-presenter-strategy'
import { updateSchema } from '@http/schemas/users/update-schema'
import { logger } from '@lib/logger'
import { makeUpdateUserUseCase } from '@use-cases/factories/users/make-update-user-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, cpf, phoneNumber, role, isActive, specificData } = updateSchema.parse(request.body)

  const updateUserUseCase = makeUpdateUserUseCase()

  const result = await updateUserUseCase.execute({
    publicId: request.user.sub,
    name,
    email,
    cpf,
    isActive,
    phoneNumber,
    specificData,
    role,
  })

  if (!result.success) {
    return HttpErrorMapper.map(result.error, reply)
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
