import { Prisma } from '@prisma/client'
import { DomainError } from '@core/domain/errors/domain-error'
import { IErrorMapper } from '@core/domain/errors/error-mappers/error-mapper.interface'

export interface PrismaErrorMapping {
  P2002?: () => DomainError
  P2025?: () => DomainError
  [key: string]: (() => DomainError) | undefined
}

export class PrismaErrorMapper implements IErrorMapper {
  constructor(private readonly errorMapping: PrismaErrorMapping) {}

  mapToDomainError(error: unknown): DomainError | Error {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const errorFactory = this.errorMapping[error.code]
      if (errorFactory) {
        return errorFactory()
      }
    }
    return error as Error
  }
}
