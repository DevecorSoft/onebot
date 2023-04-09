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

  it('able to receive bot added event', (done) => {
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

  afterAll((done) => {
    server.close()
    fs.rm(storageDir, { recursive: true, force: true }, () => done())
  })
})
