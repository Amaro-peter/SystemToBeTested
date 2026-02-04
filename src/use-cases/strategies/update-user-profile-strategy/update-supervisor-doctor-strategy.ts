import { Prisma, SupervisorDoctor, User } from '@prisma/client'
import { left, right, type ResultPattern } from '@core/logic/result-pattern'
import { SupervisorDoctorRepository } from '@repositories/supervisor-doctor-respository'
import { supervisorDoctorPayloadSchema } from '../schemas/supervisor-doctor/supervisor-doctor-schema'
import { UpdateRegisterProfileStrategy } from './update-profile-strategy.interface'
import { SupervisorDoctorCouldNotBeUpdatedError } from '@use-cases/errors/supervisor-doctor/supervisor-doctor-could-not-be-updated'
import { SupervisorDoctorAlreadyExistsError } from '@use-cases/errors/supervisor-doctor/supervisor-doctor-already-exists'
import { DomainError } from '@core/domain/errors/domain-error'

type SupervisorDoctorStrategyResponse = {
  supervisorDoctor: SupervisorDoctor
}

export class UpdateSupervisorDoctorStrategy implements UpdateRegisterProfileStrategy<SupervisorDoctorStrategyResponse> {
  constructor(private supervisorDoctorRepository: SupervisorDoctorRepository) {}

  async execute(updatedUser: User, payload: unknown): Promise<ResultPattern<DomainError, SupervisorDoctorStrategyResponse>> {
    try {
      const specificData = supervisorDoctorPayloadSchema.parse(payload)

      const supervisorDoctor = await this.supervisorDoctorRepository.update(updatedUser.id, {
        crm: specificData.crm,
      })

      if (!supervisorDoctor) {
        return left(new SupervisorDoctorCouldNotBeUpdatedError())
      }

      return right({ supervisorDoctor })

    } catch (error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        return left(new SupervisorDoctorAlreadyExistsError())
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return left(new SupervisorDoctorCouldNotBeUpdatedError())
      }

      throw error
    }
  }
}