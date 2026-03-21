import { HttpErrorMapper } from '@http/errors/http-error-mapper'
import { InstructorPresenter } from '@http/presenters/instructor/instructor-presenter'
import { searchInstructorSchema } from '@http/schemas/instructor/search-instructor-schema'
import { logger } from '@lib/logger'
import { makeSearchInstructorUseCase } from '@use-cases/instructor/factories/make-search-instructor-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function searchInstructorController(request: FastifyRequest, reply: FastifyReply) {
  const { name, registration, speciality, page, pageSize } = searchInstructorSchema.parse(request.body)

  const searchInstructorUseCase = makeSearchInstructorUseCase()

  const result = await searchInstructorUseCase.execute({
    filters: {
      name,
      registration,
      speciality,
    },
    page,
    pageSize,
  })

  if (result.success === false) {
    return HttpErrorMapper.map(result.error, reply)
  }

  logger.info('Instructors obtidos com sucesso!')

  const response = InstructorPresenter.toHTTP(result.value)

  reply.status(200).send(response)
}
