// src/use-cases/strategies/register-health-professional-strategy.ts
import { logger } from '@lib/logger'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { User } from '@prisma/client'
import { z } from 'zod'
import { RegisterProfileStrategy } from '../../../@types/use-case/users/register-profile-strategy.interface'

export interface HealthProfessionalProfileData {
  cref: string
}

const healthProfPayloadSchema = z.object({
  cref: z.string().min(4),
})

export class RegisterHealthProfessionalStrategy implements RegisterProfileStrategy {
  constructor(private dbContext: DatabaseContext) {}

  async execute(user: User, payload: unknown): Promise<HealthProfessionalProfileData> {
    const specificData = healthProfPayloadSchema.parse(payload)

    logger.info(`Registering health professional profile for user ID: ${user.id} with CREF: ${specificData.cref}`)
    // Lógica de persistência...
    /*await this.dbContext.client.healthProfessional.create({
      data: {
        userId: user.id,
        cref: specificData.cref,
      },
    })*/
    return specificData
  }
}
