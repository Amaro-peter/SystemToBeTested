/*import { DomainError } from '../domain-error'

export class WsErrorMapper {
  static map(error: Error, socket: Socket, event: string) {
    if (error instanceof DomainError) {
      // WebSockets don't need 404s or 409s. They just send the semantic type!
      return socket.emit(`${event}:error`, {
        errorType: error.type, // e.g., 'CONFLICT'
        message: error.body.message,
        internalCode: error.body.code,
      })
    }
  }
}*/
