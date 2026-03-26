import { User } from '@prisma/client'
import {
  IInstructor,
  InstructorPayload,
  InstructorRepository,
} from '@core/contracts/repositories/instructor-repository.interface'
import { IProfileStrategy } from '@core/contracts/use-case/user-profiles/strategies/profile-strategy.interface'
import { IValidator } from '@core/contracts/validation/validator.interface'
import { err, ok, Result } from '@core/shared/result'

type InstructorStrategyResponse = {
  instructor: IInstructor
}

export class RegisterInstructorStrategy implements IProfileStrategy<InstructorStrategyResponse> {
  constructor(
    private instructorRepository: InstructorRepository,
    private validator: IValidator<InstructorPayload>,
  ) {}

  async execute(user: User, payload: unknown): Promise<Result<InstructorStrategyResponse, Error>> {
    const validationResult = this.validator.validate(payload)

    if (!validationResult.success) {
      return err(validationResult.error)
    }

    const specificData = validationResult.value

    const instructorResult = await this.instructorRepository.create(user.publicId, {
      ...specificData,
    })

    if (!instructorResult.success) {
      return err(instructorResult.error)
    }

    return ok({
      instructor: instructorResult.value,
    })
  }
}
