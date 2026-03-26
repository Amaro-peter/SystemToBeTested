import { AsyncLocalStorage } from 'node:async_hooks'
import { IAsyncContext } from '@lib/async-local-storage/async-local-storage.interface'

export const asyncLocalStorage = new AsyncLocalStorage<IAsyncContext>()
