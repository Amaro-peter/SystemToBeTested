import type { FastifyInstance } from 'fastify'
import { adminRoutes } from '@controllers/admin/admin.routes'
import { healthCheckRoutes } from '@controllers/health-check/health-check.routes'
import { instructorRoutes } from '@controllers/instructor/instructor.routes'
import { patientRoutes } from '@controllers/patient/patient.routes'
import { supervisorDoctorRoutes } from '@controllers/supervisor-doctor/supervisor-doctor.routes'
import { usersRoutes } from '@controllers/users/users.routes'

export async function appRoutes(app: FastifyInstance) {
  app.register(usersRoutes, { prefix: '/users' })
  app.register(adminRoutes, { prefix: '/admin' })
  app.register(patientRoutes, { prefix: '/patients' })
  app.register(healthCheckRoutes, { prefix: '/health' })
  app.register(supervisorDoctorRoutes, { prefix: '/supervisor-doctors' })
  app.register(instructorRoutes, { prefix: '/instructors' })
}
