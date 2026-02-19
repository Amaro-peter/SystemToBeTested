import { HttpErrorMapper } from '@http/errors/http-error-mapper'
import { deleteSchema } from '@http/schemas/users/delete-schema'
import { logger } from '@lib/logger'
import { makeDeleteUserUseCase } from '@use-cases/users/factories/make-delete-user-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const { role } = deleteSchema.parse(request.body)

  const deleteUserUseCase = makeDeleteUserUseCase()

  const result = await deleteUserUseCase.execute({
    publicId: request.user.sub,
    role,
  })

  if (!result.success) {
    return HttpErrorMapper.map(result.error, reply)
  }

  logger.info('User deactivated successfully!')

  return reply.status(204).send()
}
