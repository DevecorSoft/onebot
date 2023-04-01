import { createSpaceRepository, Deps } from '@/script-properties'

describe('When user add our chat bot to his space', () => {
  it('Then should record his space name', () => {
    const fakeGetProperty = jest.fn().mockReturnValueOnce(JSON.stringify(['spaces/cnnnnXRaJGE']))
    const fakeSetProperty = jest.fn()
    const deps: Deps = {
      propertiesService: {
        getScriptProperties: () => ({
          getProperty: fakeGetProperty,
          setProperty: fakeSetProperty,
        }),
      },
    }
    const spaceName = 'spaces/cjdeeXRaJGE'

    const spaceRepository = createSpaceRepository(deps)
    spaceRepository.push(spaceName)

    expect(fakeGetProperty).toBeCalledTimes(1)
    expect(fakeGetProperty).toBeCalledWith('trigger_list')
    expect(fakeSetProperty).toBeCalledTimes(1)
    expect(fakeSetProperty).toBeCalledWith('trigger_list', JSON.stringify(['spaces/cnnnnXRaJGE', spaceName]))
  })
})

describe('When user remove my chat bot from his space', () => {
  it('Then should remove his space name from trigger list', () => {
    const fakeGetProperty = jest.fn().mockReturnValueOnce(JSON.stringify(['spaces/cnnnnXRaJGE', 'spaces/cjdeeXRaJGE']))
    const fakeSetProperty = jest.fn()
    const deps: Deps = {
      propertiesService: {
        getScriptProperties: () => ({
          getProperty: fakeGetProperty,
          setProperty: fakeSetProperty,
        }),
      },
    }
    const spaceName = 'spaces/cjdeeXRaJGE'

    const spaceRepository = createSpaceRepository(deps)
    spaceRepository.remove(spaceName)

    expect(fakeGetProperty).toBeCalledTimes(1)
    expect(fakeGetProperty).toBeCalledWith('trigger_list')
    expect(fakeSetProperty).toBeCalledTimes(1)
    expect(fakeSetProperty).toBeCalledWith('trigger_list', JSON.stringify(['spaces/cnnnnXRaJGE']))
  })
})

describe('Given chat bot is triggered by time-driven trigger', () => {
  describe('When traverse all the existing spaces', () => {
    it('Then should be able to list all the spaces', () => {
      const fakeGetProperty = jest.fn().mockReturnValueOnce(JSON.stringify(['spaces/cnnnnXRaJGE', 'test space']))
      const fakeSetProperty = jest.fn()
      const deps: Deps = {
        propertiesService: {
          getScriptProperties: () => ({
            getProperty: fakeGetProperty,
            setProperty: fakeSetProperty,
          }),
        },
      }

      const spaceRepository = createSpaceRepository(deps)
      const spaces = spaceRepository.get()

      expect(spaces).toEqual(['spaces/cnnnnXRaJGE', 'test space'])
    })
  })
})
