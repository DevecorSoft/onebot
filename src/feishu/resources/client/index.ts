import { Router } from 'express'
import { AddBotHandler, post } from './client'
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
    lark.adaptExpress(new lark.EventDispatcher({})
      .register({
        'im.chat.member.bot.added_v1': AddBotHandler(deps)
      }))
  )
  return router
}

export * from './type'
