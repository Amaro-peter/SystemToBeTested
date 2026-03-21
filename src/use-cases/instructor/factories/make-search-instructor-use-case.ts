import { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { PrismaErrorMapper } from '@lib/prisma/utils/prisma-error-mapper'
import { PrismaInstructorRepository } from '@repositories/prisma/prisma-instructor-repository'
import { instructorErrorMapping } from '@use-cases/errors/health-professional/health-professional-error-mapper'
import { SearchInstructorUseCase } from '../search-instructor-use-case'

export function makeSearchInstructorUseCase() {
  const dbContext = new DatabaseContext()
  const errorMapper = new PrismaErrorMapper(instructorErrorMapping)
  const instructorRepository = new PrismaInstructorRepository(dbContext, errorMapper)

  const searchInstructorUseCase = new SearchInstructorUseCase(instructorRepository)

  return searchInstructorUseCase
}
