import { server } from './server'
import axios, { AxiosResponse } from 'axios'
import fs from 'fs'
import { storage, storageDir } from '@/feishu/persistentce'
import { clientPropertyName } from '@/script-properties'
import { FeishuPayload } from '@/feishu/resources'
import { spacePropertyName } from '@/script-properties/spaceRepository'

describe('post client', () => {
  it('able to register a bot by feishu', (done) => {
    axios.post<{ challenge: string }>('/client', {
      challenge: 'ajls384kdjx98XX',
      token: 'xxxxxx',
      type: 'url_verification'
    }).then(
      (res,) => {
        expect(res.status).toEqual(200)
        expect(res.data).toEqual({
          challenge: 'ajls384kdjx98XX'
        })
        const clientProperty = storage.getScriptProperties().getProperty(clientPropertyName) ?? 'null'
        const client = JSON.parse(clientProperty) as Record<string, unknown>
        expect(Object.keys(client)).toHaveLength(1)
        done()
      }
    ).catch(
      (err) => done(err)
    )
  })

  it('able to handle bot added event', (done) => {
    const chatId = 'sfewcvfef'
    const group = 'onechat group'
    axios.post<undefined, AxiosResponse<Record<string, never>>, FeishuPayload>('/client', {
      schema: '',
      header: {
        event_id: 'event-id-1',
        token: 'event-token',
        event_type: 'im.chat.member.bot.added_v1',
        create_time: null,
        tenant_key: null,
        app_id: null,
      },
      event: {
        chat_id: chatId,
        name: group
      }
    })
      .then((data) => {
        expect(data.status).toEqual(200)
        expect(storage.getScriptProperties().getProperty(spacePropertyName)).toEqual(JSON.stringify({
          [chatId]: {
            id: chatId,
            chatIdentity: 'feishu',
            spaceIdentity: {
              chat_id: chatId,
              name: group
            }
          }
        }))
        done()
      })
      .catch((err) => done(err))
  })

  it('able to handle message event', (done) => {
    axios.post<undefined, AxiosResponse<Record<string, never>>, FeishuPayload>('/client', {
      'schema': '2.0',
      'header': {
        'event_id': '5e3702a84e847582be8db7fb73283c02',
        'event_type': 'im.message.receive_v1',
        'create_time': '1608725989000',
        'token': 'rvaYgkND1GOiu5MM0E1rncYC6PLtF7JV',
        'app_id': 'cli_9f5343c580712544',
        'tenant_key': '2ca1d211f64f6438'
      },
      'event': {
        'sender': {
          'sender_id': {
            'union_id': 'on_8ed6aa67826108097d9ee143816345',
            'user_id': 'e33ggbyz',
            'open_id': 'ou_84aad35d084aa403a838cf73ee18467'
          },
          'sender_type': 'user',
          'tenant_key': '736588c9260f175e'
        },
        'message': {
          'message_id': 'om_5ce6d572455d361153b7cb51da133945',
          'root_id': 'om_5ce6d572455d361153b7cb5xxfsdfsdfdsf',
          'parent_id': 'om_5ce6d572455d361153b7cb5xxfsdfsdfdsf',
          'create_time': '1609073151345',
          'chat_id': 'oc_5ce6d572455d361153b7xx51da133945',
          'chat_type': 'group',
          'message_type': 'text',
          'content': '{"text":"@_user_1 hello"}',
          'mentions': [
            {
              'key': '@_user_1',
              'id': {
                'union_id': 'on_8ed6aa67826108097d9ee143816345',
                'user_id': 'e33ggbyz',
                'open_id': 'ou_84aad35d084aa403a838cf73ee18467'
              },
              'name': 'Tom',
              'tenant_key': '736588c9260f175e'
            }
          ]
        }
      }
    })
      .then((data) => {
        expect(data.status).toEqual(200)
        done()
      })
      .catch((err) => done(err))
  })

  afterAll((done) => {
    server.close()
    fs.rm(storageDir, {recursive: true, force: true}, () => done())
  })
})
