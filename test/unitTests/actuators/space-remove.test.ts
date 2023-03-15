import { createActuator } from '@/actuators/iocActuator'
import { removeSpace } from '@/actuators/space-remove'

describe('When user remove our chat bot from his space', () => {
  it('Then should remove his space name', () => {
    const spaceName = 'spaces/cccceXRaJGE'
    const spaceRepository = { remove: jest.fn() }

    createActuator(removeSpace, { spaceRepository }).act(spaceName)

    expect(spaceRepository.remove).toBeCalledTimes(1)
    expect(spaceRepository.remove).toBeCalledWith(spaceName)
  })
})
