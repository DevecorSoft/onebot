import { executeActuator } from '@/actuators/iocContainer'
import { createAddSpaceActuator } from '@/actuators/space-add'

describe('When user add our chat bot to his space', () => {
  it('Then should record his space name', () => {
    const spaceName = 'spaces/cccceXRaJGE'
    const spaceRepository = { push: jest.fn() }
    
    executeActuator(createAddSpaceActuator({ spaceRepository }), spaceName)

    expect(spaceRepository.push).toBeCalledTimes(1)
    expect(spaceRepository.push).toBeCalledWith(spaceName)
  })
})
