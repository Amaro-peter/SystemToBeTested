import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { listSupervisorDoctorController } from './list-supervisor-doctor.controller'
import { searchSupervisorDoctorController } from './search-supervisor-doctor.controller'

export async function supervisorDoctorRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      onRequest: [verifyJwt],
    },
    listSupervisorDoctorController,
  )

  app.post(
    '/search',
    {
      onRequest: [verifyJwt],
    },
    searchSupervisorDoctorController,
  )
}
