import { FastifyInstance } from 'fastify'
import { EnumUserRole } from '@core/contracts/repositories/users-repository.interface'
import { verifyJwt } from '@middlewares/verify-jwt.middleware'
import { verifyUserRole } from '@middlewares/verify-user-role.middleware'
import { registerAdmin } from './register-admin.controller'

export async function adminRoutes(app: FastifyInstance) {
  app.post('/register', { onRequest: [verifyJwt, verifyUserRole([EnumUserRole.ADMIN])] }, registerAdmin)
}
