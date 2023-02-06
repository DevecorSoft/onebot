import { addSpace } from '@/actuators/space-add'
import { createActuator } from '@/actuators/iocActuator'

describe('When user add our chat bot to his space', () => {
  it('Then should record his space name', () => {
    const spaceName = 'spaces/cccceXRaJGE'
    const spaceRepository = { push: jest.fn() }

    createActuator(addSpace, { spaceRepository }).act(spaceName)

    expect(spaceRepository.push).toBeCalledTimes(1)
    expect(spaceRepository.push).toBeCalledWith(spaceName)
  })
})
