import * as D from 'io-ts/Decoder'

export type EventType = 'im.chat.member.bot.added_v1' |
  'im.chat.member.bot.deleted_v1' |
  'im.chat.disbanded_v1' |
  'im.message.receive_v1'

export interface BotEvent {
  readonly chat_id: string
  readonly name: string
}

export const BotEvent = D.struct({
  chat_id: D.string,
  name: D.string
})

export interface UserId {
  readonly union_id: string,
  readonly user_id: string,
  readonly open_id: string
}

export interface Mention {
  key: string,
  id: UserId,
  name: string,
  tenant_key: string
}

export interface MessageEvent {
  readonly sender: {
    'sender_id': UserId | null,
    'sender_type': 'user',
    'tenant_key': string
  } | null
  readonly message: {
    'message_id': string,
    'root_id': string,
    'parent_id': string,
    'create_time': string,
    'chat_id': string,
    'chat_type': 'group',
    'message_type': 'text',
    'content': string,
    'mentions': Mention[]
  }
}

export const MessageEvent = D.struct({
  sender: D.nullable(D.struct({
      sender_id: D.nullable(D.struct({
        union_id: D.string,
        user_id: D.string,
        open_id: D.string
      })),
      sender_type: D.literal('user'),
      tenant_key: D.string
    })
  ),
  message: D.struct({
    message_id: D.string,
    root_id: D.string,
    parent_id: D.string,
    create_time: D.string,
    chat_id: D.string,
    chat_type: D.literal('group'),
    message_type: D.literal('text'),
    content: D.string,
    mentions: D.array(
      D.struct({
        key: D.string,
        id: D.struct({
          union_id: D.string,
          user_id: D.string,
          open_id: D.string
        }),
        name: D.string,
        tenant_key: D.string
      })
    )
  })
})

type Event = BotEvent | MessageEvent

export interface FeishuPayloadHeader {
  readonly event_id: string,
  readonly token: string,
  readonly create_time: string | null,
  readonly event_type: EventType,
  readonly tenant_key: string | null,
  readonly app_id: string | null,
}

export interface FeishuPayload {
  readonly schema: string | null,
  readonly header: FeishuPayloadHeader,
  readonly event: Event
}

export const FeishuPayload = D.struct({
  schema: D.nullable(D.string),
  header: D.struct({
    event_id: D.string,
    token: D.string,
    create_time: D.nullable(D.string),
    event_type: D.literal(
      'im.chat.member.bot.added_v1',
      'im.chat.member.bot.deleted_v1',
      'im.chat.disbanded_v1',
      'im.message.receive_v1'
    ),
    tenant_key: D.nullable(D.string),
    app_id: D.nullable(D.string),
  }),
  event: D.UnknownRecord
})
