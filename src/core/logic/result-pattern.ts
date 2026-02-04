export type Result<T, E = Error> = { success: true; value: T } | { success: false; error: E }

/**
 * Creates a success result.
 */
export const ok = <T>(value: T): Result<T, never> => ({
  success: true,
  value,
})

/**
 * Creates a failure result.
 */
export const err = <E>(error: E): Result<never, E> => ({
  success: false,
  error,
})

/**
 * Type guard to check if the result is a success.
 */
export function isOk<T, E>(result: Result<T, E>): result is { success: true; value: T } {
  return result.success
}

/**
 * Type guard to check if the result is a failure.
 */
export function isErr<T, E>(result: Result<T, E>): result is { success: false; error: E } {
  return !result.success
}
