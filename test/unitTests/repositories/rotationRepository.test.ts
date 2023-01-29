import { createRotationRepository, Deps, RotationItem } from '@/repositories'

describe('Given user try to add a rotation', () => {
  describe('When required parameters are fulfilled', () => {
    it('Then should persist the rotation via rotation repository incrementally', () => {
      const fakeGetProperty = jest.fn()
      const fakeSetProperty = jest.fn()
      const deps: Deps = {
        propertiesService: {
          getScriptProperties: () => ({
            getProperty: fakeGetProperty,
            setProperty: fakeSetProperty,
          }),
        },
      }
      const repository = createRotationRepository(deps)
      const item: RotationItem = {
        id: 'df37a860-15a4-11ed-bd15-7b630f540d86',
        title: 'my title',
        timer: '1-5 *',
        participants: ['devecor', 'someone'],
        thread: 'spaces/AAABaxOMxU/threads/I--cu_wca78',
      }

      repository.add(item, 'space name 1')

      expect(fakeGetProperty).toBeCalledTimes(1)
      expect(fakeSetProperty).toBeCalledTimes(1)
      expect(fakeGetProperty).toBeCalledWith('space name 1')
      expect(fakeSetProperty).toBeCalledWith('space name 1', JSON.stringify({ rotations: [item] }))
    })
  })
})

describe('When user try to list all rotations exists', () => {
  it('Then should just return the persistent rotation items we have', () => {
    const existingRotationItems = [
      {
        id: 'df37a860-15a4-11ed-bd15-7b630f540d86',
        title: 'my title',
        timer: '1-5 *',
        participants: ['devecor', 'someone'],
      },
    ]
    const fakeGetProperty = jest.fn().mockReturnValueOnce(JSON.stringify({ rotations: existingRotationItems }))
    const fakeSetProperty = jest.fn()
    const deps: Deps = {
      propertiesService: {
        getScriptProperties: () => ({
          getProperty: fakeGetProperty,
          setProperty: fakeSetProperty,
        }),
      },
    }
    const repository = createRotationRepository(deps)

    const rotationItems = repository.get('space name 3')

    expect(fakeGetProperty).toBeCalledTimes(1)
    expect(fakeSetProperty).toBeCalledTimes(0)
    expect(fakeGetProperty).toBeCalledWith('space name 3')
    expect(rotationItems).toEqual(existingRotationItems)
  })

  describe('When there is no any item', () => {
    it('Then should return an empty array instead of empty string', () => {
      const fakeGetProperty = jest.fn().mockReturnValueOnce(null)
      const fakeSetProperty = jest.fn()
      const deps: Deps = {
        propertiesService: {
          getScriptProperties: () => ({
            getProperty: fakeGetProperty,
            setProperty: fakeSetProperty,
          }),
        },
      }
      const repository = createRotationRepository(deps)

      const rotationItems = repository.get('space name')

      expect(fakeGetProperty).toBeCalledTimes(1)
      expect(fakeSetProperty).toBeCalledTimes(0)
      expect(fakeGetProperty).toBeCalledWith('space name')
      expect(rotationItems).toEqual([])
    })
  })
})

describe('Given user want to adjust an rotation', () => {
  describe('When query rotation by id and it is existing', () => {
    it('Then should return the persistent rotation item', () => {
      const existingRotationItem = {
        id: 'df37a860-15a4-11ed-bd15-7b630f540d86',
        title: 'my title',
        timer: '1-5 *',
        participants: ['devecor', 'someone'],
      }
      const fakeGetProperty = jest.fn().mockReturnValueOnce(JSON.stringify({ rotations: [existingRotationItem] }))
      const fakeSetProperty = jest.fn()
      const deps: Deps = {
        propertiesService: {
          getScriptProperties: () => ({
            getProperty: fakeGetProperty,
            setProperty: fakeSetProperty,
          }),
        },
      }
      const repository = createRotationRepository(deps)

      const rotationItem = repository.getById('df37a860-15a4-11ed-bd15-7b630f540d86', 'space name')

      expect(fakeGetProperty).toBeCalledTimes(1)
      expect(fakeSetProperty).toBeCalledTimes(0)
      expect(fakeGetProperty).toBeCalledWith('space name')
      expect(rotationItem).toEqual(existingRotationItem)
    })
  })

  describe('When query rotation by id but it is not existing', () => {
    it('Then should return null', () => {
      const existingRotationItem = {
        id: 'df37a860-15a4-11ed-bd15-7b630f540d86',
        title: 'my title',
        timer: '1-5 *',
        participants: ['devecor', 'someone'],
      }
      const fakeGetProperty = jest.fn().mockReturnValueOnce(JSON.stringify([existingRotationItem]))
      const fakeSetProperty = jest.fn()
      const deps: Deps = {
        propertiesService: {
          getScriptProperties: () => ({
            getProperty: fakeGetProperty,
            setProperty: fakeSetProperty,
          }),
        },
      }
      const repository = createRotationRepository(deps)

      const rotationItem = repository.getById('df37a860-15a4-11ed-xxxx-7b630f540d86', 'space name 2')

      expect(fakeGetProperty).toBeCalledTimes(1)
      expect(fakeSetProperty).toBeCalledTimes(0)
      expect(fakeGetProperty).toBeCalledWith('space name 2')
      expect(rotationItem).toEqual(null)
    })
  })

  describe('When update a rotation and it is existing', () => {
    it('Then should update the existing rotation item', () => {
      const existingRotationItems: RotationItem[] = [
        {
          id: 'df37a860-15a4-11ed-bd15-7b630f540d86',
          title: 'my title',
          timer: '1-5 *',
          participants: ['devecor', 'someone', 'Mike'],
          thread: 'spaces/AAABaxOMxU/threads/I--cu_wca78'
        },
        {
          id: 'df37a860-15a4-11ed-xxxx-7b630f540d86',
          title: 'another rotation',
          timer: '1-5 *',
          participants: ['Jon', 'someone', 'Mike'],
          thread: 'spaces/AAABaxOMxU/threads/I--cu_wca78'
        },
      ]
      const newRotationItem: RotationItem = { ...existingRotationItems[0], participants: ['someone', 'Mike', 'devecor'] }
      const fakeGetProperty = jest.fn().mockReturnValueOnce(JSON.stringify({ rotations: existingRotationItems }))
      const fakeSetProperty = jest.fn()
      const deps: Deps = {
        propertiesService: {
          getScriptProperties: () => ({
            getProperty: fakeGetProperty,
            setProperty: fakeSetProperty,
          }),
        },
      }
      const repository = createRotationRepository(deps)

      repository.update(newRotationItem, 'space name x')

      expect(fakeGetProperty).toBeCalledTimes(1)
      expect(fakeGetProperty).toBeCalledWith('space name x')
      expect(fakeSetProperty).toBeCalledTimes(1)
      expect(fakeSetProperty).toBeCalledWith('space name x', JSON.stringify({ rotations: [newRotationItem, existingRotationItems[1]] }))
    })
  })
})

describe('When user want to delete an rotation by rotation id', () => {
  it('Then should return null when the rotation is not existed in current space', () => {
    const existingRotationItems = [
      {
        id: 'df37a860-15a4-11ed-bd15-7b630f540d86',
        title: 'my title',
        timer: '1-5 *',
        participants: ['devecor', 'someone'],
      },
    ]
    const fakeGetProperty = jest.fn().mockReturnValueOnce(JSON.stringify({ rotations: existingRotationItems }))
    const fakeSetProperty = jest.fn()
    const deps: Deps = {
      propertiesService: {
        getScriptProperties: () => ({
          getProperty: fakeGetProperty,
          setProperty: fakeSetProperty,
        }),
      },
    }

    const repository = createRotationRepository(deps)
    const result = repository.deleteById('df37a860-15a4-xxxx-bd15-7b630f540d86', 'my space name 3413')

    expect(result).toBeNull()
    expect(fakeSetProperty).toBeCalledTimes(0)
    expect(fakeGetProperty).toBeCalledTimes(1)
    expect(fakeGetProperty).toBeCalledWith('my space name 3413')
  })

  it('Then should return the rotation that is just deleted', () => {
    const existingRotationItems = [
      {
        id: 'df37a860-15a4-11ed-bd15-7b630f540d86',
        title: 'my title',
        timer: '1-5 *',
        participants: ['devecor', 'someone'],
      },
    ]
    const fakeGetProperty = jest.fn().mockReturnValueOnce(JSON.stringify({ rotations: existingRotationItems }))
    const fakeSetProperty = jest.fn()
    const deps: Deps = {
      propertiesService: {
        getScriptProperties: () => ({
          getProperty: fakeGetProperty,
          setProperty: fakeSetProperty,
        }),
      },
    }

    const repository = createRotationRepository(deps)
    const result = repository.deleteById('df37a860-15a4-11ed-bd15-7b630f540d86', 'my space name 3413')

    expect(result).toEqual(existingRotationItems[0])
    expect(fakeGetProperty).toBeCalledTimes(1)
    expect(fakeGetProperty).toBeCalledWith('my space name 3413')
    expect(fakeSetProperty).toBeCalledTimes(1)
    expect(fakeSetProperty).toBeCalledWith('my space name 3413', JSON.stringify({ rotations: [] }))
  })
})
