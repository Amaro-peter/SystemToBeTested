import { HttpErrorMapper } from '@http/errors/http-error-mapper'
import { UserPresenter } from '@http/presenters/users/user-presenter'
import { searchUsersSchema } from '@http/schemas/users/search-users-schema'
import { makeSearchUsersUseCase } from '@use-cases/users/factories/make-search-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function searchUsersController(request: FastifyRequest, reply: FastifyReply) {
  const { page, pageSize, name, email, cpf, isActive } = searchUsersSchema.parse(request.body)

  const searchUsersUseCase = makeSearchUsersUseCase()

  const result = await searchUsersUseCase.execute({
    filters: {
      name,
      email,
      cpf,
      isActive,
    },
    page,
    pageSize,
  })

  if (result.success === false) {
    return HttpErrorMapper.map(result.error, reply)
  }

  const response = UserPresenter.toHTTP(result.value)

  return reply.status(200).send(response)
}
