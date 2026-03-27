import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { FastifyInstance } from 'fastify'
import { listInstructorController } from './list-instructor.controller'
import { searchInstructorController } from './search-instructor.controller'

export async function instructorRoutes(app: FastifyInstance) {
  app.get(
    '/',
    {
      onRequest: [verifyJwt],
    },
    listInstructorController,
  )

  app.post(
    '/search',
    {
      onRequest: [verifyJwt],
    },
    searchInstructorController,
  )
}
