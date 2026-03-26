import { FastifyReply, FastifyRequest } from 'fastify'
import { HttpErrorMapper } from '@http/errors/http-error-mapper'
import { UserPresenter } from '@http/presenters/users/user-presenter'
import { makeSearchUsersUseCase } from '@use-cases/users/factories/make-search-user-use-case'
import { searchUsersSchema } from 'schemas/http/users/search-users-schema'

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
