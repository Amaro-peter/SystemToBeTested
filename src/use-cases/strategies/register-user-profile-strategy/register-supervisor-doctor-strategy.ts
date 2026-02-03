import { Prisma, SupervisorDoctor, User } from '@prisma/client'
import { RegisterProfileStrategy } from './register-profile-strategy.interface'
import { logger } from '@lib/logger'
import { SupervisorDoctorRepository } from '@repositories/supervisor-doctor-respository'
import { SupervisorDoctorCouldNotBeCreatedError } from '@use-cases/errors/supervisor-doctor/supervisor-doctor-could-not-be-created'
import { SupervisorDoctorAlreadyExistsError } from '@use-cases/errors/supervisor-doctor/supervisor-doctor-already-exists'
import { supervisorDoctorPayloadSchema } from '../schemas/supervisor-doctor/supervisor-doctor-schema'

export interface SupervisorDoctorStrategyResponse {
  supervisorDoctor: SupervisorDoctor
}

export class RegisterSupervisorDoctorStrategy implements RegisterProfileStrategy {
  constructor(private supervisorDoctorRepository: SupervisorDoctorRepository) {}

  async execute(user: User, payload: unknown): Promise<SupervisorDoctorStrategyResponse> {
    try {
      const specificData = supervisorDoctorPayloadSchema.parse(payload)

      logger.info(`Registering supervisor doctor profile for user ID: ${user.id} with CRM: ${specificData.crm}`)
      
      const supervisorDoctor = await this.supervisorDoctorRepository.create(user.publicId, 
        { 
          crm: specificData.crm 
        }
      )

      if(!supervisorDoctor) {
        throw new SupervisorDoctorCouldNotBeCreatedError()
      }

      return { supervisorDoctor }

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new SupervisorDoctorAlreadyExistsError()
      }

      throw error
    }
  }
}
