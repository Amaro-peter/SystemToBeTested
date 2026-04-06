import { FastifyInstance } from 'fastify'
import { registerPatient } from './register-patient.controller'

export async function patientRoutes(app: FastifyInstance) {
  app.post('/register', registerPatient)
}
