import { createListRotationActuator } from '@/actuators/rotation-list'
import { executeActuator } from '@/actuators/iocContainer'

describe('When user try to check how many rotation exists', () => {
  it('Then should list current rotations', () => {
    const listRotations = jest.fn().mockReturnValueOnce([
      {
        id: 'c8932a71-a3fc-44ea-b4f7-fffb017b39f1',
        title: 'The title',
        timer: '1-5 *',
        participants: 'Jon A, Someone B, Devecor C'.split(', '),
      },
    ])
    const rotationRepository = {
      get: listRotations,
    }

    const msg = executeActuator(createListRotationActuator({ rotationRepository }))

    expect(listRotations).toBeCalledTimes(1)
    expect(msg).toEqual('[c8932a71-a3fc-44ea-b4f7-fffb017b39f1] The title "1-5 *" "Jon A, Someone B, Devecor C"')
  })

  describe('When there is no any rotation so far', () => {
    const listRotations = jest.fn().mockReturnValueOnce([])
    const rotationRepository = {
      get: listRotations,
    }

    const msg = executeActuator(createListRotationActuator({ rotationRepository }))

    expect(listRotations).toBeCalledTimes(1)
    expect(msg).toEqual('Currently, there is *no rotation configured* in this space.')
  })
})
