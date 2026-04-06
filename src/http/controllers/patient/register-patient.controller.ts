import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserPresenter } from '@http/presenters/users/user-presenter'
import { logger } from '@lib/logger'
import { makeRegisterUserUseCase } from '@use-cases/users/factories/make-register-user-use-case'
import { HttpErrorMapper } from 'errors/http/http-error.mapper'
import { registerPatientPayloadSchema } from 'schemas/use-cases/user-profiles/patients/register-patient-schema'
import { EnumUserRole } from '@core/contracts/repositories/users-repository.interface'

export async function registerPatient(request: FastifyRequest, reply: FastifyReply) {
  const data = registerPatientPayloadSchema.parse(request.body)

  const registerUserUseCase = makeRegisterUserUseCase()

  const result = await registerUserUseCase.execute({
    name: data.name,
    email: data.email,
    cpf: data.cpf,
    phoneNumber: data.phoneNumber,
    password: data.password,
    role: EnumUserRole.PATIENT,
    specificData: {
      birthDate: data.birthDate,
      gender: data.gender,
      riskLevel: data.riskLevel,
      medicationsInUse: data.medicationsInUse,
      assistantDoctorName: data.assistantDoctorName,
      assistantDoctorPhone: data.assistantDoctorPhone,
      healthInsuranceNumber: data.healthInsuranceNumber,
      referenceHospital: data.referenceHospital,
      emergencyContactName: data.emergencyContactName,
      emergencyContactPhone: data.emergencyContactPhone,
      healthInsuranceName: data.healthInsuranceName,
    },
  })

  if (result.success === false) {
    return HttpErrorMapper.map(result.error, reply)
  }

  const { user, userProfile } = result.value
  logger.info({ userId: user.publicId, role: user.role }, `User PATIENT registered successfully!`)

  return reply.status(201).send(UserPresenter.toHTTP(user, userProfile))
}
