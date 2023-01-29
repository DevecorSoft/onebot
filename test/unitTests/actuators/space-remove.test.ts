import { executeActuator } from '@/actuators/iocContainer'
import { createRemoveSpaceActuator } from '@/actuators/space-remove'

describe('When user remove our chat bot from his space', () => {
  it('Then should remove his space name', () => {
    const spaceName = 'spaces/cccceXRaJGE'
    const spaceRepository = { remove: jest.fn() }
    
    executeActuator(createRemoveSpaceActuator({ spaceRepository }), spaceName)

    expect(spaceRepository.remove).toBeCalledTimes(1)
    expect(spaceRepository.remove).toBeCalledWith(spaceName)
  })
})
