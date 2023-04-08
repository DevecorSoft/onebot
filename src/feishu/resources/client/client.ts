import { RequestHandler } from 'express'
import { BotEvent, FeishuPayload, FeishuPayloadHeader } from './type'
import * as D from 'io-ts/Decoder'
import { isRight, match } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { SpaceDomain } from '@/domain'
import { ClientDomain } from '@/feishu/domain'

export interface ClientDeps {
  uuid: () => string,
  space: SpaceDomain
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

type Payload = UrlVerificationPayload | FeishuPayload

export const post: (deps: ClientDeps) => RequestHandler<Record<string, never>, { challenge?: string }, Payload> =
  (deps) =>
    (req, res) => {
      [req.body].filter((payload) => pipe(
          payload,
          UrlVerificationPayload.decode,
          match(
            () => true,
            (urlVerificationPayload) => {

              const {challenge, type, token} = urlVerificationPayload
              deps.client.add({challenge, type, token, id: deps.uuid()})
              res.send({challenge})
              return false
            }
          )
        )
      ).reduce<{header: FeishuPayloadHeader, event: Record<string, unknown>}[]>((_, payload) => pipe(
          payload,
          FeishuPayload.decode,
          (payload) => {
            if (isRight(payload)) {
              return [{header: payload.right.header, event: payload.right.event}]
            } else {
              res.sendStatus(400)
              return []
            }
          }
        ),
        []
      ).filter((payload) => {
        pipe(
          payload.event,
          BotEvent.decode,
          match(
            () => true,
            (botEvent) => {
              if (payload.header.event_type === 'im.chat.member.bot.added_v1') {
                deps.space.add({
                  id: botEvent.chat_id,
                  chatIdentity: 'feishu',
                  spaceIdentity: botEvent
                })
                res.sendStatus(200)
              }
              return false
            }
          )
        )
      })
    }
