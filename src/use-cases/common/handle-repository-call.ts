// handle-repository-call.ts
import { err, ok, Result } from '@core/logic/result-pattern'
import { IErrorMapper } from '@tps/error-interfaces/error-mapper.interface'

export async function handleRepositoryCall<T>(
  errorMapper: IErrorMapper,
  operation: () => Promise<T>,
): Promise<Result<T, Error>> {
  try {
    const value = await operation()
    return ok(value)
  } catch (error) {
    const mappedError = errorMapper.mapToKnownError(error)
    return err(mappedError)
  }
}
