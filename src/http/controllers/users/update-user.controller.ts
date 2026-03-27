import { UserPresenter } from '@http/presenters/users/user-presenter'
import { UserProfilePresenter } from '@http/presenters/users/user-profile-presenter'
import { logger } from '@lib/logger'
import { makeUpdateUserUseCase } from '@use-cases/users/factories/make-update-user-use-case'
import { HttpErrorMapper } from 'errors/http/http-error-mapper'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { updateSchema } from 'schemas/http/users/update-schema'

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

  if (!result.success) {
    return HttpErrorMapper.map(result.error, reply)
  }

  const { updatedUser, updatedUserProfile } = result.value

  logger.info('Usuário atualizado com sucesso!')

  const response = {
    user: UserPresenter.toHTTP(updatedUser),
    userProfile: undefined as unknown,
  }

  if (updatedUserProfile) {
    response.userProfile = UserProfilePresenter.toHTTP(updatedUserProfile)
  }

  return reply.status(200).send(response)
}
