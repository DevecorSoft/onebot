import { Router } from 'express'
import { post } from './client'
import { randomUUID } from 'crypto'
import { ClientDomain } from '@/feishu/domain'
import { SpaceDomain } from '@/domain'

const router = Router()

export interface ClientDeps {
  readonly client: ClientDomain
  readonly space: SpaceDomain
}

export const client = (deps: ClientDeps) => {
  router.post('/client', post({
    uuid: randomUUID,
    ...deps
  }))
  return router
}

export * from './type'
