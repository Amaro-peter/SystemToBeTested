import type { FastifyReply, FastifyRequest } from 'fastify'
import { HttpErrorMapper } from '@http/errors/http-error-mapper'
import { UserPresenter } from '@http/presenters/users/user-presenter'
import { logger } from '@lib/logger'
import { makeListUsersUseCase } from '@use-cases/users/factories/make-list-users-use-case'
import { listUsersSchema } from 'schemas/http/users/list-users-schema'

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
  const { page, pageSize } = listUsersSchema.parse(request.query)

  const listUsers = makeListUsersUseCase()

  const result = await listUsers.execute({ page, pageSize })

  if (result.success === false) {
    return HttpErrorMapper.map(result.error, reply)
  }

  logger.info('Usuáios recuperados com sucesso!')

  const users = result.value

  const sanitizedUsers = UserPresenter.toHTTP(users)

  return reply.status(200).send({ users: sanitizedUsers })
}
