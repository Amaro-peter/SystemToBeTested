// handle-repository-call.ts
import { IErrorMapper } from '@core/domain/errors/error-mappers/error-mapper.interface'
import { err, ok, Result } from '@core/logic/result-pattern'

export async function handleRepositoryCall<T>(
  errorMapper: IErrorMapper,
  operation: () => Promise<T>,
): Promise<Result<T, Error>> {
  try {
    const value = await operation()
    return ok(value)
  } catch (error) {
    const mappedError = errorMapper.mapToDomainError(error)
    return err(mappedError)
  }
}
