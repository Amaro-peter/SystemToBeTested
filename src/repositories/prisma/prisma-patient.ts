import { Patient } from '@prisma/client'
import {
  CreatePatientPayload,
  EnumGender,
  EnumRiskLevel,
  IPatient,
  PatientRepository,
} from '@core/contracts/repositories/patient-repository.interface'
import { err, ok, Result } from '@core/shared/result'
import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'

export class PrismaPatientRepository implements PatientRepository {
  constructor(
    private readonly dbContext: DatabaseContext,
    private readonly errorMapper: PrismaErrorMapper,
  ) {}

  async create(userId: number, data: CreatePatientPayload): Promise<Result<IPatient, Error>> {
    try {
      const patient = await this.dbContext.client.patient.create({
        data: {
          ...data,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      })

      return ok(this.mapToIPatient(patient))
    } catch (error) {
      const domainError = this.errorMapper.mapToKnownError(error)
      return err(domainError)
    }
  }

  async update(userId: number, data: Partial<CreatePatientPayload>): Promise<Result<Patient, Error>> {
    try {
      const updated = await this.dbContext.client.patient.update({
        where: {
          userId: userId,
        },
        data: {
          ...data,
        },
      })
      return ok(updated)
    } catch (error) {
      const domainError = this.errorMapper.mapToKnownError(error)
      return err(domainError)
    }
  }

  async deactivatePatient(userId: number): Promise<Result<Patient, Error>> {
    try {
      const deactivated = await this.dbContext.client.patient.update({
        where: {
          userId: userId,
        },
        data: {
          deletedAt: new Date(),
        },
      })
      return ok(deactivated)
    } catch (error) {
      return err(this.errorMapper.mapToKnownError(error))
    }
  }

  async findByUserId(userId: number): Promise<Patient | null> {
    const patient = await this.dbContext.client.patient.findUnique({
      where: {
        userId,
      },
    })
    return patient
  }

  private mapToIPatient(patient: Patient): IPatient {
    return {
      id: patient.id,
      publicId: patient.publicId,
      birthDate: patient.birthDate,
      medicationsInUse: patient.medicationsInUse,
      assistantDoctorName: patient.assistantDoctorName,
      assistantDoctorPhone: patient.assistantDoctorPhone,
      healthInsuranceNumber: patient.healthInsuranceNumber,
      referenceHospital: patient.referenceHospital,
      emergencyContactName: patient.emergencyContactName,
      emergencyContactPhone: patient.emergencyContactPhone,
      healthInsuranceName: patient.healthInsuranceName,
      gender: patient.gender as EnumGender,
      riskLevel: patient.riskLevel as EnumRiskLevel,
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
      deletedAt: patient.deletedAt,
      userId: patient.userId,
      supervisorDoctorId: patient.supervisorDoctorId,
      classId: patient.classId,
    }
  }
}
