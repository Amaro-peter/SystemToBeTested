export function ensureError(value: unknown): Error {
  if (value instanceof Error) {
    return value
  }

  if (typeof value === 'string') {
    return new Error(value)
  }

  if (typeof value === 'object' && value !== null) {
    // Duck-type error-like objects
    if ('message' in value && typeof value.message === 'string') {
      const error = new Error(value.message)
      // Preserve stack if available
      if ('stack' in value && typeof value.stack === 'string') {
        error.stack = value.stack
      }
      return error
    }
  }

  // Fallback for everything else (numbers, null, undefined, symbols, etc.)
  return new Error(String(value))
}
