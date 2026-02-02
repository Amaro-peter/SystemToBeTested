// src/use-cases/strategies/register-health-professional-strategy.ts
import { User } from '@prisma/client'
import { z } from 'zod'
import { RegisterProfileStrategy } from './register-profile-strategy.interface'
import { logger } from '@lib/logger'

const healthProfPayloadSchema = z.object({
  cref: z.string().min(4),
})

export class RegisterHealthProfessionalStrategy implements RegisterProfileStrategy {
  async execute(user: User, payload: unknown): Promise<void> {
    const specificData = healthProfPayloadSchema.parse(payload)

    logger.info(`Registering health professional profile for user ID: ${user.id} with CREF: ${specificData.cref}`)
    // Lógica de persistência...
  }
}
