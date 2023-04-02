import { addClient } from '@/feishu/resources/client/client'

describe('client', () => {
  it('able to persist client', () => {
    const add = jest.fn()

    addClient(
      {
        add,
        uuid: () => 'client-id'
      },
      {
        challenge: 'ajls384kdjx98XX',
        token: 'xxxxxx',
        type: 'url_verification'
      }
    )

    expect(add).toBeCalledTimes(1)
    expect(add).toBeCalledWith({
      id: 'client-id',
      challenge: 'ajls384kdjx98XX',
      token: 'xxxxxx',
      type: 'url_verification'
    })
  })
})
