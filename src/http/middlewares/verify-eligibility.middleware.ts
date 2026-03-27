import { messages } from '@core/constants/messages'
import { UserRole } from '@prisma/client'
import type { FastifyReply, FastifyRequest } from 'fastify'

interface RegisterBody {
  role?: UserRole
}

export async function verifyEligibility(request: FastifyRequest, reply: FastifyReply) {
  const { role: targetRole } = request.body as RegisterBody

  // Default to PATIENT if no role is specified (common for public registration)
  const roleToCreate = targetRole || UserRole.PATIENT

  const { role: requesterRole } = request.user

  switch (requesterRole) {
    case UserRole.ADMIN:
      // Admin can register ANYONE (Admin, Supervisor, HealthProf, Patient)
      return

    case UserRole.SUPERVISOR_DOCTOR:
    case UserRole.INSTRUCTOR:
      // Supervisors and HealthProfs can ONLY register PATIENTS.
      // They cannot create Admins, other Supervisors, or HealthProfs.
      if (roleToCreate === UserRole.PATIENT) {
        return
      }
      return reply.status(403).send({ message: messages.errors.forbidden })

    case UserRole.PATIENT:
    default:
      return reply.status(403).send({ message: messages.errors.forbidden })
  }
}
