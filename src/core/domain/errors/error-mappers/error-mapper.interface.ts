import { DomainError } from "@core/domain/errors/domain-error";

export interface IErrorMapper {
  mapToDomainError(error: unknown): DomainError | unknown
}