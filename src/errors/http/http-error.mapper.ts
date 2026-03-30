import { FastifyReply } from 'fastify'
import { SystemError } from 'errors/system-error'
import { DomainError } from '../domain-error'
import { toHttpStatus } from './http-error-status.mapper'

export class HttpErrorMapper {
  static map(error: Error, reply: FastifyReply) {
    if (error instanceof DomainError || error instanceof SystemError) {
      const httpCode = toHttpStatus(error.type)
      return reply.status(httpCode).send({
        message: error.body.message,
        code: error.body.code,
        issues: error.body.issues,
      })
    }

    // Handle unknown errors
    throw error
  }
}
