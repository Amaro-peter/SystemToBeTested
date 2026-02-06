import { ensureError } from '@utils/error-handlers'

export type Result<T, E = Error> = { success: true; value: T } | { success: false; error: E }

export const ok = <T>(value: T): Result<T, never> => ({
  success: true,
  value,
})

export const err = (error: unknown): Result<never, Error> => ({
  success: false,
  error: ensureError(error),
})

export const errOf = <E>(error: E): Result<never, E> => ({
  success: false,
  error,
})

export function isOk<T, E>(result: Result<T, E>): result is { success: true; value: T } {
  return result.success
}

export function isErr<T, E>(result: Result<T, E>): result is { success: false; error: E } {
  return !result.success
}
