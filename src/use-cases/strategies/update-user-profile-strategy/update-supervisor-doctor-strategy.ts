import { SupervisorDoctor, User } from '@prisma/client'
import { err, ok, type Result } from '@core/logic/result-pattern'
import { SupervisorDoctorRepository } from '@repositories/supervisor-doctor-respository'
import { DomainError } from '@core/domain/errors/domain-error'
import { IValidator } from '@core/domain/validation/validator.interface'
import { IErrorMapper } from '@core/domain/errors/error-mappers/error-mapper.interface'
import { UpdateProfileStrategy } from './update-profile-strategy.interface'

type SupervisorDoctorStrategyResponse = {
  supervisorDoctor: SupervisorDoctor
}

type SupervisorDoctorPayload = {
  crm: string
}

export class UpdateSupervisorDoctorStrategy implements UpdateProfileStrategy<SupervisorDoctorStrategyResponse> {
  constructor(
    private supervisorDoctorRepository: SupervisorDoctorRepository,
    private validator: IValidator<SupervisorDoctorPayload>,
    private errorMapper: IErrorMapper,
  ) {}

  async execute(updatedUser: User, payload: unknown): Promise<Result<SupervisorDoctorStrategyResponse, DomainError>> {
    const validationResult = this.validator.validate(payload)

    if (!validationResult.success) {
      throw validationResult.error
    }

    const specificData = validationResult.value

    try {
      const supervisorDoctor = await this.supervisorDoctorRepository.update(updatedUser.id, {
        crm: specificData.crm,
      })

      return ok({
        supervisorDoctor,
      })
    } catch (error) {
      const domainError = this.errorMapper.mapToDomainError(error)

      if (domainError instanceof DomainError) {
        return err(domainError)
      }

      throw error
    }
  }
}
