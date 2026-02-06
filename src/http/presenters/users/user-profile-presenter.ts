export type PresenterRule<Input, Output> = (data: Input) => Output

// Tipo auxiliar para manipular objetos desconhecidos de forma segura
type Dictionary = Record<string, unknown>

export class UserProfilePresenter {
  // --- Overloads ---

  // 1. Objeto Único COM regra
  static toHTTP<Input, Output>(input: Input, rule: PresenterRule<Input, Output>): Output

  // 2. Objeto Único SEM regra (padrão)
  static toHTTP<Input>(input: Input): Omit<Input, 'id' | 'userId'>

  // 3. Array COM regra
  static toHTTP<Input, Output>(input: Input[], rule: PresenterRule<Input, Output>): Output[]

  // 4. Array SEM regra (padrão)
  static toHTTP<Input>(input: Input[]): Omit<Input, 'id' | 'userId'>[]

  // --- Implementação ---

  static toHTTP(input: unknown, rule?: PresenterRule<unknown, unknown>): unknown {
    if (!input) return null

    // Strip id/userId recursively first, then apply rule at the end
    const stripped = this.stripFields(input)

    // Apply rule only at the top level if provided
    if (rule) {
      return rule(stripped)
    }

    return stripped
  }

  // Internal method to recursively strip id and userId
  private static stripFields(input: unknown): unknown {
    if (!input) return null

    // 1. Tratar Arrays
    if (Array.isArray(input)) {
      return input.map((item) => this.stripFields(item))
    }

    // 2. Se não for objeto (string, number, boolean, Date), retorna como está
    if (typeof input !== 'object') {
      return input
    }

    // 3. Handle Date objects - return as-is
    if (input instanceof Date) {
      return input
    }

    // 4. Deep Clone seguro
    const objectCopy = { ...(input as Dictionary) }

    // 5. Remove campos padrões
    delete objectCopy['id']
    delete objectCopy['userId']

    // 6. Processar recursivamente
    const processedObject: Dictionary = Object.keys(objectCopy).reduce((acc, key) => {
      const value = objectCopy[key]

      if (value instanceof Date) {
        // Keep Date objects as-is
        acc[key] = value
      } else if (value && typeof value === 'object' && !Array.isArray(value)) {
        // RECURSÃO OBJETO
        acc[key] = this.stripFields(value)
      } else if (Array.isArray(value)) {
        // RECURSÃO ARRAY
        acc[key] = value.map((item) => this.stripFields(item))
      } else {
        // Valor primitivo
        acc[key] = value
      }

      return acc
    }, {} as Dictionary)

    return processedObject
  }
}
