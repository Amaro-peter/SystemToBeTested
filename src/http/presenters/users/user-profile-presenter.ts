export class UserProfilePresenter {
  static toHTTP(data: unknown): unknown {
    if (data === null || data === undefined) {
      return data
    }

    if (Array.isArray(data)) {
      return data.map((item) => this.toHTTP(item))
    }

    if (data instanceof Date) {
      return data.toISOString()
    }

    if (typeof data === 'object') {
      const cleanObject: Record<string, unknown> = {}
      const originalObject = data as Record<string, unknown>

      Object.keys(originalObject).forEach((key) => {
        if (key === 'id' || key === 'userId') {
          return
        }

        cleanObject[key] = this.toHTTP(originalObject[key])
      })

      return cleanObject
    }
    return data
  }
}
