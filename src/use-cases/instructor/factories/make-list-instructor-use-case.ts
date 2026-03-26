import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaHTTPErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { PrismaInstructorRepository } from '@repositories/prisma/prisma-instructor-repository'
import { instructorHTTPErrorMapping } from '@use-cases/errors/instructor/instructor-error-mapper'
import { ListInstructorUseCase } from '../list-instructor-use-case'

export function makeListInstructorUseCase() {
  const dbContext = new DatabaseContext()
  const errorMapper = new PrismaHTTPErrorMapper(instructorHTTPErrorMapping)
  const instructorRepository = new PrismaInstructorRepository(dbContext, errorMapper)

  const listInstructorUseCase = new ListInstructorUseCase(instructorRepository)

  return listInstructorUseCase
}
