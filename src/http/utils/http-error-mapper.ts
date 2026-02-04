import { DomainError } from "@core/domain/errors/domain-error";
import { FastifyReply } from "fastify";


export class HttpErrorMapper {
    static map(error: Error, reply: FastifyReply) {
        if(error instanceof DomainError) {
            return reply.status(error.status).send({
                message: error.message
            })
        }
        
        throw error
    }
}