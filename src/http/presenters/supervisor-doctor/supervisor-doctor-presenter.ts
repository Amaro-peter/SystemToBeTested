import { ISupervisorDoctor } from '@core/contracts/repositories/supervisor-doctor-respository.interface'
import { IUserHTTP, UserPresenter, UserWithRelations } from '../users/user-presenter'

export class SupervisorDoctorPresenter {
  static toHTTP(input: ISupervisorDoctor | ISupervisorDoctor[]): IUserHTTP | IUserHTTP[] {
    if (Array.isArray(input)) {
      return input.map((item) => this.toHTTP(item) as IUserHTTP)
    }

    const unifiedEntity = {
      ...input.user,
      supervisorDoctor: {
        publicId: input.publicId,
        crm: input.crm,
        crmUf: input.crmUf,
        status: input.status,
        dataRegistro: input.dataRegistro,
        dataValidade: input.dataValidade,
        patientCount: input.patientCount,
        patients: input.patients,
      },
    } as unknown as UserWithRelations

    return UserPresenter.toHTTP(unifiedEntity)
  }
}
