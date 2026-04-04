import { PrismaErrorMapping } from '@lib/prisma/utils/prisma-error-mapper'
import { UserOperationFailedError } from '@use-cases/errors/users/user-operation-failed-error'

export const authenticationAuditErrorMapping: PrismaErrorMapping = {
  P2000: (error) =>
    new UserOperationFailedError({
      prisma: {
        code: error.code,
        meta: error.meta,
      },
    }),
  P2003: (error) =>
    new UserOperationFailedError({
      prisma: {
        code: error.code,
        meta: error.meta,
      },
    }),
  P2004: (error) =>
    new UserOperationFailedError({
      prisma: {
        code: error.code,
        meta: error.meta,
      },
    }),
  P2011: (error) =>
    new UserOperationFailedError({
      prisma: {
        code: error.code,
        meta: error.meta,
      },
    }),
  P2012: (error) =>
    new UserOperationFailedError({
      prisma: {
        code: error.code,
        meta: error.meta,
      },
    }),
  P2014: (error) =>
    new UserOperationFailedError({
      prisma: {
        code: error.code,
        meta: error.meta,
      },
    }),
  P2015: (error) =>
    new UserOperationFailedError({
      prisma: {
        code: error.code,
        meta: error.meta,
      },
    }),
  P2016: (error) =>
    new UserOperationFailedError({
      prisma: {
        code: error.code,
        meta: error.meta,
      },
    }),
  P2021: (error) =>
    new UserOperationFailedError({
      prisma: {
        code: error.code,
        meta: error.meta,
      },
    }),
  P2022: (error) =>
    new UserOperationFailedError({
      prisma: {
        code: error.code,
        meta: error.meta,
      },
    }),
}
