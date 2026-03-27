import { FastifyReply, FastifyRequest } from 'fastify'
import { SupervisorDoctorPresenter } from '@http/presenters/supervisor-doctor/supervisor-doctor-presenter'
import { makeSearchSupervisorDoctorUseCase } from '@use-cases/supervisor-doctors/factories/make-search-supervisor-doctor-use-case'
import { HttpErrorMapper } from 'errors/http/http-error-mapper'
import { searchSupervisorDoctorByNameSchema } from 'schemas/http/supervisor-doctor/search-supervisor-doctor-schema'

export async function searchSupervisorDoctorController(request: FastifyRequest, reply: FastifyReply) {
  const { page, pageSize, name, crm, crmUf, status } = searchSupervisorDoctorByNameSchema.parse(request.body)

  const searchSupervisorDoctorUseCase = makeSearchSupervisorDoctorUseCase()

  const result = await searchSupervisorDoctorUseCase.execute({
    filters: { name, crm, crmUf, status },
    page,
    pageSize,
  })

  if (result.success === false) {
    return HttpErrorMapper.map(result.error, reply)
  }

  const supervisorDoctors = result.value

  const response = SupervisorDoctorPresenter.toHTTP(supervisorDoctors)

  return reply.status(200).send(response)
}
