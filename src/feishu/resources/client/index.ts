import { Router } from 'express'
import { AddBotHandler, post, ReceiveMessageHandler } from './client'
import { randomUUID } from 'crypto'
import { ClientDomain } from '@/feishu/domain'
import { SpaceDomain } from '@/domain'
import * as lark from '@larksuiteoapi/node-sdk'
import process from 'process'
import { Client } from '@larksuiteoapi/node-sdk'

const router = Router()

export interface ClientDeps {
  readonly client: ClientDomain
  readonly space: SpaceDomain
}

let feishuClientInstance: Client | null = null
const feishuClient = () => {
  if (
    process.env.feishu_app_id === undefined ||
    process.env.feishu_app_secret == undefined
  ) {
    throw Error('please provide feishu bot credential')
  }
  if (feishuClientInstance === null) {
    feishuClientInstance = new lark.Client({
      appId: process.env.feishu_app_id,
      appSecret: process.env.feishu_app_secret
    })
  }
  return feishuClientInstance
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
          ...AddBotHandler({space: deps.space, feishuClient: feishuClient()}),
          ...ReceiveMessageHandler(feishuClient())
        })
    )
  )
  return router
}

export * from './type'
