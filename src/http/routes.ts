import { healthCheckRoutes } from '@controllers/health-check/health-check.routes'
import { instructorRoutes } from '@controllers/instructor/instructor.routes'
import { supervisorDoctorRoutes } from '@controllers/supervisor-doctor/supervisor-doctor.routes'
import { usersRoutes } from '@controllers/users/users.routes'
import type { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes, { prefix: '/users' })
  app.register(healthCheckRoutes, { prefix: '/health' })
  app.register(supervisorDoctorRoutes, { prefix: '/supervisor-doctors' })
  app.register(instructorRoutes, { prefix: '/instructors' })
}
