import { Router } from 'express'
import { AddBotHandler, post, ReceiveMessageHandler } from './client'
import { randomUUID } from 'crypto'
import { ClientDomain } from '@/feishu/domain'
import { SpaceDomain } from '@/domain'
import * as lark from '@larksuiteoapi/node-sdk'
import process from 'process'
import { Client } from '@larksuiteoapi/node-sdk'
import { tick } from '@/coreApi/rotation'

const router = Router()

export interface ClientDeps {
  readonly client: ClientDomain
  readonly space: SpaceDomain
}

let feishuClientInstance: Client | null = null
let nodejsTimer: NodeJS.Timer | null = null
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
  if (nodejsTimer === null) {
    nodejsTimer = setInterval(() => {
      console.log('%stick!\n', new Date().toISOString())
      tick({
        act: (message, spaceName) => {
          feishuClientInstance?.im.message.create({
            params: { receive_id_type: 'chat_id' },
            data: {
              receive_id: spaceName,
              msg_type: 'text',
              content: JSON.stringify({ text: message })
            }
          }).then(() => console.info(`post message succeed`))
            .catch((err) => console.error(err))
        }
    }).act()
    }, 1000 * 3600)
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
