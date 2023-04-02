import { server } from './server'
import axios from 'axios'

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
        done()
      }
    ).catch(
      (err) => done(err)
    )
  })
  afterAll(() => server.close())
})
