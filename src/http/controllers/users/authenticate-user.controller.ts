import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserPresenter } from '@http/presenters/users/user-presenter'
import { logger } from '@lib/logger'
import { makeAuthenticateUserUseCase } from '@use-cases/users/factories/make-authenticate-user-use-case'
import { HttpErrorMapper } from 'errors/http/http-error.mapper'
import { authenticateSchema } from 'schemas/http/users/authenticate-schema'

export async function authenticateUser(request: FastifyRequest, reply: FastifyReply) {
  const { login, password } = authenticateSchema.parse(request.body)

  const ipAddress = request.ip || 'UNKNOWN'
  const userAgent = request.headers['user-agent'] || 'UNKNOWN'

  const authenticateUserUseCase = makeAuthenticateUserUseCase()

  const result = await authenticateUserUseCase.execute({
    login,
    password,
    ipAddress,
    userAgent,
  })

  if (result.success === false) {
    return HttpErrorMapper.map(result.error, reply)
  }

  const { user } = result.value

  const token = await reply.jwtSign(
    { role: user.role },
    {
      sign: {
        sub: user.publicId,
        expiresIn: '1d',
      },
    },
  )

  logger.info({ userId: user.publicId, role: user.role }, 'User authenticated successfully!')

  return reply.status(200).send({
    token,
    user: UserPresenter.toHTTP(user),
  })
}
