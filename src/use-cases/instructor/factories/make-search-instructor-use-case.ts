import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { PrismaInstructorRepository } from '@repositories/prisma/prisma-instructor-repository'
import { instructorHTTPErrorMapping } from '@use-cases/errors/instructor/instructor-error-mapper'
import { SearchInstructorUseCase } from '../search-instructor-use-case'

export function makeSearchInstructorUseCase() {
  const dbContext = new DatabaseContext()
  const errorMapper = new PrismaErrorMapper(instructorHTTPErrorMapping)
  const instructorRepository = new PrismaInstructorRepository(dbContext, errorMapper)

  const searchInstructorUseCase = new SearchInstructorUseCase(instructorRepository)

  return searchInstructorUseCase
}
