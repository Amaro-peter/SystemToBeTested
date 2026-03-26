import { FastifyReply, FastifyRequest } from 'fastify'
import { SupervisorDoctorPresenter } from '@http/presenters/supervisor-doctor/supervisor-doctor-presenter'
import { logger } from '@lib/logger'
import { makeListSupervisorDoctorUseCase } from '@use-cases/supervisor-doctors/factories/make-list-supervisor-doctor-use-case'
import { HttpErrorMapper } from 'errors/http/http-error-mapper'
import { listSupervisorDoctorSchema } from 'schemas/http/supervisor-doctor/list-supervisor-doctor-schema'

export async function listSupervisorDoctorController(request: FastifyRequest, reply: FastifyReply) {
  const { page, pageSize } = listSupervisorDoctorSchema.parse(request.query)

  const listSupervisorDoctorUseCase = makeListSupervisorDoctorUseCase()

  const result = await listSupervisorDoctorUseCase.execute({ page, pageSize })

  if (result.success === false) {
    return HttpErrorMapper.map(result.error, reply)
  }

  logger.info('Supervisor Doctors listados com sucesso!')

  const response = SupervisorDoctorPresenter.toHTTP(result.value)

  reply.status(200).send(response)
}
