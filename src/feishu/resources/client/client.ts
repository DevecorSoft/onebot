import { RequestHandler } from 'express'
import * as D from 'io-ts/Decoder'
import { match } from 'fp-ts/Either'
import { pipe } from 'fp-ts/function'
import { SpaceDomain } from '@/domain'
import { ClientDomain } from '@/feishu/domain'

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

type AddBotHandler = (data: {
  event_id?: string;
  token?: string;
  create_time?: string;
  event_type?: string;
  tenant_key?: string;
  ts?: string;
  uuid?: string;
  type?: string;
  app_id?: string;
  chat_id?: string;
  operator_id?: {
    union_id?: string;
    user_id?: string;
    open_id?: string;
  };
  external?: boolean;
  operator_tenant_key?: string;
  name?: string;
  i18n_names?: {
    zh_cn?: string;
    en_us?: string;
    ja_jp?: string;
  };
}) => Promise<any> | any

export const AddBotHandler: (deps: { space: SpaceDomain }) => AddBotHandler = (deps) =>
  (data) => {
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
