import { Router } from 'express'
import { post } from './client'
import { PersistentClient } from '@/feishu/resources/client/type'
import { randomUUID } from 'crypto'

const router = Router()

export const client = (persistence: PersistentClient) => {
  router.post('/client', post({
    ...persistence,
    uuid: randomUUID
  }))
  return router
}

export * from './type'
