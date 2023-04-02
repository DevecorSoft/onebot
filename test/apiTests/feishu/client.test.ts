import { server } from './server'
import axios from 'axios'
import fs from 'fs'
import { storage } from '@/feishu/persistentce'
import { propertyName } from '@/script-properties'

describe('post client', () => {
  it('200', (done) => {
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
        expect(storage.getScriptProperties().getProperty(propertyName)).not.toEqual('')
        done()
      }
    ).catch(
      (err) => done(err)
    )
  })
  afterAll((done) => {
    server.close()
    fs.rm('./.storage', { recursive: true, force: true }, () => done())
  })
})
