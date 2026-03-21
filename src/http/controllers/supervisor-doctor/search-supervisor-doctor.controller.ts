import { HttpErrorMapper } from '@http/errors/http-error-mapper'
import { SupervisorDoctorPresenter } from '@http/presenters/supervisor-doctor/supervisor-doctor-presenter'
import { searchSupervisorDoctorByNameSchema } from '@http/schemas/supervisor-doctor/search-supervisor-doctor-schema'
import { makeSearchSupervisorDoctorUseCase } from '@use-cases/supervisor-doctors/factories/make-search-supervisor-doctor-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function searchSupervisorDoctorController(request: FastifyRequest, reply: FastifyReply) {
  const { page, pageSize, name, crm, crmUf, tipoCrm, status } = searchSupervisorDoctorByNameSchema.parse(request.body)

  const searchSupervisorDoctorUseCase = makeSearchSupervisorDoctorUseCase()

  const result = await searchSupervisorDoctorUseCase.execute({
    filters: { name, crm, crmUf, tipoCrm, status },
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
