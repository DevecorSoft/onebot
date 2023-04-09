import { Router } from 'express'
import { AddBotHandler, post, ReceiveMessageHandler } from './client'
import { randomUUID } from 'crypto'
import { ClientDomain } from '@/feishu/domain'
import { SpaceDomain } from '@/domain'
import * as lark from '@larksuiteoapi/node-sdk'
import process from 'process'

const router = Router()

export interface ClientDeps {
  readonly client: ClientDomain
  readonly space: SpaceDomain
}

const feishuClient = () => {
  if (
    process.env.feishu_app_id === undefined ||
    process.env.feishu_app_secret == undefined
  ) {
    throw Error('please provide feishu bot credential')
  }
  return new lark.Client({
    appId: process.env.feishu_app_id,
    appSecret: process.env.feishu_app_secret
  })
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
          ...ReceiveMessageHandler(feishuClient())
        })
    )
  )
  return router
}

export * from './type'
