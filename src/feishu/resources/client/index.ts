import { Router } from 'express'
import { AddBotHandler, post, ReceiveMessageHandler } from './client'
import { randomUUID } from 'crypto'
import { ClientDomain } from '@/feishu/domain'
import { SpaceDomain } from '@/domain'
import * as lark from '@larksuiteoapi/node-sdk'

const router = Router()

export interface ClientDeps {
  readonly client: ClientDomain
  readonly space: SpaceDomain
}

export const client = (deps: ClientDeps) => {
  router.post(
    '/client',
    post({
      uuid: randomUUID,
      ...deps
    }),
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    lark.adaptExpress(
      new lark.EventDispatcher({})
        .register({
          ...AddBotHandler(deps),
          ...ReceiveMessageHandler()
        })
    )
  )
  return router
}

export * from './type'
