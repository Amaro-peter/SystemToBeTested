import { Prisma } from '@prisma/client'
import { DomainError } from '@core/domain/errors/domain-error'
import { IErrorMapper } from '@core/domain/errors/error-mappers/error-mapper.interface'

export interface PrismaErrorMapping {
  P2000?: () => DomainError // Value too long for column
  P2001?: () => DomainError // Record not found in where condition
  P2002?: () => DomainError // Unique constraint violation
  P2003?: () => DomainError // Foreign key constraint failed
  P2025?: () => DomainError // Record not found (update/delete)
  P2014?: () => DomainError // Relation violation
  P2015?: () => DomainError // Related record not found
  P2016?: () => DomainError // Query interpretation error
  P2021?: () => DomainError // Table does not exist
  P2022?: () => DomainError // Column does not exist
  [key: string]: (() => DomainError) | undefined
}

export class PrismaErrorMapper implements IErrorMapper {
  constructor(private readonly errorMapping: PrismaErrorMapping) {}

  mapToDomainError(error: unknown): DomainError | unknown {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const errorFactory = this.errorMapping[error.code]
      if (errorFactory) {
        return errorFactory()
      }
    }

    return error
  }
}
