import { FastifyReply, FastifyRequest } from 'fastify'
import { InstructorPresenter } from '@http/presenters/instructor/instructor-presenter'
import { logger } from '@lib/logger'
import { makeListInstructorUseCase } from '@use-cases/instructor/factories/make-list-instructor-use-case'
import { HttpErrorMapper } from 'errors/http/http-error.mapper'
import { listInstructorSchema } from 'schemas/http/instructor/list-instructor-schema'

export async function listInstructorController(request: FastifyRequest, reply: FastifyReply) {
  const { page, pageSize } = listInstructorSchema.parse(request.query)

  const listInstructorUseCase = makeListInstructorUseCase()

  const result = await listInstructorUseCase.execute({ page, pageSize })

  if (result.success === false) {
    return HttpErrorMapper.map(result.error, reply)
  }

  logger.info('Instructors listados com sucesso!')

  const response = InstructorPresenter.toHTTP(result.value)

  reply.status(200).send({ data: response })
}
