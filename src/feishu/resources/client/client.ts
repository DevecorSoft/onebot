import { RequestHandler } from 'express'
import * as D from 'io-ts/Decoder'
import { match } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { SpaceDomain } from '@/domain'
import { ClientDomain } from '@/feishu/domain'
import { EventHandles } from '@larksuiteoapi/node-sdk'

export interface ClientDeps {
  uuid: () => string,
  client: ClientDomain
}

interface UrlVerificationPayload {
  challenge: string
  token: string
  type: string
}

const UrlVerificationPayload = D.struct({
  challenge: D.string,
  token: D.string,
  type: D.literal('url_verification')
})

export const post: (deps: ClientDeps) => RequestHandler<Record<string, never>, { challenge?: string }, UrlVerificationPayload> =
  (deps) =>
    (req, res, next) => {
      pipe(
        req.body,
        UrlVerificationPayload.decode,
        match(
          () => next(),
          (urlVerificationPayload) => {

            const {challenge, type, token} = urlVerificationPayload
            deps.client.add({challenge, type, token, id: deps.uuid()})
            res.send({challenge})
          }
        )
      )
    }

export const AddBotHandler: (deps: { space: SpaceDomain }) => Pick<EventHandles, 'im.chat.member.bot.added_v1'> = (deps) => ({
  'im.chat.member.bot.added_v1': (data) => {
    if (
      data.chat_id === undefined ||
      data.name === undefined
    ) {
      return
    }
    deps.space.add({
      id: data.chat_id,
      chatIdentity: 'feishu',
      spaceIdentity: {chat_id: data.chat_id, name: data.name}
    })
  }
})

export const ReceiveMessageHandler: () => Pick<EventHandles, 'im.message.receive_v1'> = () => ({
  'im.message.receive_v1': (data) => {
    const content = JSON.parse(data.message.content) as unknown
    console.log(content)
  }
})
