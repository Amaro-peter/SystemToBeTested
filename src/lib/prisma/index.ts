import { env } from '@env/index'
import { adapter } from './helper/adapter'
import { PrismaClient } from '@prisma/client/extension'

export const prisma = new PrismaClient({
  adapter,
  log: env.LOG_LEVEL === 'debug' ? ['query', 'info', 'warn'] : [],
})
