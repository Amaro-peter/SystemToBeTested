import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserPresenter } from '@http/presenters/users/user-presenter'
import { logger } from '@lib/logger'
import { makeRegisterUserUseCase } from '@use-cases/users/factories/make-register-user-use-case'
import { HttpErrorMapper } from 'errors/http/http-error.mapper'
import { registerAdminPayloadSchema } from 'schemas/use-cases/user-profiles/admin/register-admin-schema'

export async function registerAdmin(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, cpf, phoneNumber, password, role } = registerAdminPayloadSchema.parse(request.body)

  const registerUserUseCase = makeRegisterUserUseCase()

  const result = await registerUserUseCase.execute({
    name,
    email,
    cpf,
    phoneNumber,
    password,
    role,
    specificData: {},
  })

  if (result.success === false) {
    return HttpErrorMapper.map(result.error, reply)
  }

  const { user, userProfile } = result.value
  logger.info({ userId: user.publicId, role: user.role }, `User ADMIN registered successfully!`)

  const response = UserPresenter.toHTTP(user, userProfile)

  return reply.status(201).send(response)
}
