import { Prisma } from '@prisma/client'
import { IAppError } from '@core/contracts/errors/app-error.interface'
import { IErrorMapper } from '@core/contracts/errors/error-mapper.interface'

export interface PrismaErrorMapping {
  P2000?: () => IAppError // Value too long for column
  P2001?: () => IAppError // Record not found in where condition
  P2002?: () => IAppError // Unique constraint violation
  P2003?: () => IAppError // Foreign key constraint failed
  P2025?: () => IAppError // Record not found (update/delete)
  P2014?: () => IAppError // Relation violation
  P2015?: () => IAppError // Related record not found
  P2016?: () => IAppError // Query interpretation error
  P2021?: () => IAppError // Table does not exist
  P2022?: () => IAppError // Column does not exist
  [key: string]: (() => IAppError) | undefined
}

export class PrismaErrorMapper implements IErrorMapper<IAppError> {
  constructor(private readonly errorMapping: PrismaErrorMapping) {}

  mapToKnownError(error: unknown): IAppError | unknown {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const errorFactory = this.errorMapping[error.code]
      if (errorFactory) {
        return errorFactory()
      }
    }

    return error
  }
}
