import { UserPresenter } from '@http/presenters/users/user-presenter'
import { logger } from '@lib/logger'
import { makeListUsersUseCase } from '@use-cases/users/factories/make-list-users-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function listUsers(_request: FastifyRequest, reply: FastifyReply) {
  const listUsers = makeListUsersUseCase()

  const { users } = await listUsers.execute()

  logger.info('Admins retrieved successfully!')

  return reply.status(200).send({ admins: UserPresenter.toHTTP(users) })
}
