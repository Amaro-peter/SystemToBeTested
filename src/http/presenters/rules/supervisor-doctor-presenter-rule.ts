import { PresenterRule } from '../users/user-profile-presenter'

type SanitizedInput = Record<string, unknown>

export const SupervisorDoctorPresenterRule: PresenterRule<SanitizedInput, SanitizedInput> = (data) => {
  // 1. Extraímos o objeto aninhado e descartamos as datas do nível do perfil
  const { createdAt, updatedAt, supervisorDoctor, ...rest } = data as {
    createdAt?: unknown
    updatedAt?: unknown
    supervisorDoctor?: Record<string, unknown>
    [key: string]: unknown
  }

  // 2. Se houver um objeto supervisorDoctor, limpamos as datas DELE também antes de espalhar
  const cleanedDoctor = supervisorDoctor ? { ...supervisorDoctor } : {}
  delete cleanedDoctor.createdAt
  delete cleanedDoctor.updatedAt

  // 3. Resultado plano e limpo
  return {
    ...rest,
    ...cleanedDoctor,
  }
}
