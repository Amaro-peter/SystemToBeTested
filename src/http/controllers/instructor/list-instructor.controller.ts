import { HttpErrorMapper } from '@http/errors/http-error-mapper'
import { InstructorPresenter } from '@http/presenters/instructor/instructor-presenter'
import { listInstructorSchema } from '@http/schemas/instructor/list-instructor-schema'
import { logger } from '@lib/logger'
import { makeListInstructorUseCase } from '@use-cases/instructor/factories/make-list-instructor-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function listInstructorController(request: FastifyRequest, reply: FastifyReply) {
  const { page, pageSize } = listInstructorSchema.parse(request.query)

  const listInstructorUseCase = makeListInstructorUseCase()

  const result = await listInstructorUseCase.execute({ page, pageSize })

  if (result.success === false) {
    return HttpErrorMapper.map(result.error, reply)
  }

  logger.info('Instructors listados com sucesso!')

  const response = InstructorPresenter.toHTTP(result.value)

  reply.status(200).send(response)
}
