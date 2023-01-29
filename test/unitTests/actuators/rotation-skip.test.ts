import { executeActuator } from '@/actuators/iocContainer'
import { createSkipRotationActuator } from '@/actuators/rotation-skip'

describe('Given user have rotations added', () => {
  describe('When user want to adjust specific rotation by skip subcommand', () => {
    it('Then should validate parameters first', () => {
      const args = ['0dd5aba3-6234-417a-87c4-2138e78556cd', '2']
      const lengthValidator = jest.fn().mockReturnValueOnce({
        validate: () => ({
          execute: jest.fn(),
        }),
      })
      const getByRotationId = jest.fn().mockReturnValueOnce({
        id: '0dd5aba3-6234-417a-87c4-2138e78556cd',
        title: 'The title',
        timer: '1-5 *',
        participants: ['devecor', 'someone', 'Mike', 'Bob'],
      })

      executeActuator(
        createSkipRotationActuator({
          rotationRepository: { getById: getByRotationId, update: jest.fn() },
          lengthValidator,
        }),
        ...args
      )

      expect(lengthValidator).toBeCalledTimes(1)
      expect(lengthValidator).toBeCalledWith([2, 3], ['0dd5aba3-6234-417a-87c4-2138e78556cd', '2'])
    })

    it('Then should skip participants', () => {
      const args = ['0dd5aba3-6234-417a-87c4-2138e78556cd', '2', 'space name 5231']
      const lengthValidator = jest.fn().mockReturnValueOnce({
        validate: () => ({
          execute: (target: () => void) => target(),
        }),
      })

      const getByRotationId = jest.fn().mockReturnValueOnce({
        id: '0dd5aba3-6234-417a-87c4-2138e78556cd',
        title: 'The title',
        timer: '1-5 *',
        participants: ['devecor', 'someone', 'Mike', 'Bob'],
      })
      const updateRotation = jest.fn()
      const res = executeActuator(
        createSkipRotationActuator({
          rotationRepository: { getById: getByRotationId, update: updateRotation },
          lengthValidator,
        }),
        ...args
      )

      expect(getByRotationId).toBeCalledTimes(1)
      expect(getByRotationId).toBeCalledWith('0dd5aba3-6234-417a-87c4-2138e78556cd', 'space name 5231')
      expect(updateRotation).toBeCalledTimes(1)
      expect(updateRotation).toBeCalledWith(
        {
          id: '0dd5aba3-6234-417a-87c4-2138e78556cd',
          title: 'The title',
          timer: '1-5 *',
          participants: ['Mike', 'Bob', 'devecor', 'someone'],
        },
        'space name 5231'
      )
      expect(res).toEqual('2 participant(s) of "`The title`" was *skipped*, next will be @Mike.')
    })

    it('Then should skip one participant by default', () => {
      const args = ['0dd5aba3-6234-417a-87c4-2138e78556cd', 'space name 7341']
      const lengthValidator = jest.fn().mockReturnValueOnce({
        validate: () => ({
          execute: (target: () => void) => target(),
        }),
      })

      const getByRotationId = jest.fn().mockReturnValueOnce({
        id: '0dd5aba3-6234-417a-87c4-2138e78556cd',
        title: 'The title',
        timer: '1-5 *',
        participants: ['devecor', 'someone', 'Mike', 'Bob'],
      })
      const updateRotation = jest.fn()
      const res = executeActuator(
        createSkipRotationActuator({
          rotationRepository: { getById: getByRotationId, update: updateRotation },
          lengthValidator,
        }),
        ...args
      )

      expect(getByRotationId).toBeCalledTimes(1)
      expect(getByRotationId).toBeCalledWith('0dd5aba3-6234-417a-87c4-2138e78556cd', 'space name 7341')
      expect(updateRotation).toBeCalledTimes(1)
      expect(updateRotation).toBeCalledWith(
        {
          id: '0dd5aba3-6234-417a-87c4-2138e78556cd',
          title: 'The title',
          timer: '1-5 *',
          participants: ['someone', 'Mike', 'Bob', 'devecor'],
        },
        'space name 7341'
      )
      expect(res).toEqual('1 participant(s) of "`The title`" was *skipped*, next will be @someone.')
    })

    it('Then should tell user the rotation is not existing', () => {
      const args = ['0dd5aba3-6234-417a-87c4-2138e78556cd', 'space name 1234']
      const lengthValidator = jest.fn().mockReturnValueOnce({
        validate: () => ({
          execute: (target: () => void) => target(),
        }),
      })

      const getByRotationId = jest.fn().mockReturnValueOnce(null)
      const updateRotation = jest.fn()
      const res = executeActuator(
        createSkipRotationActuator({
          rotationRepository: { getById: getByRotationId, update: updateRotation },
          lengthValidator,
        }),
        ...args
      )

      expect(getByRotationId).toBeCalledTimes(1)
      expect(getByRotationId).toBeCalledWith('0dd5aba3-6234-417a-87c4-2138e78556cd', 'space name 1234')
      expect(updateRotation).toBeCalledTimes(0)
      expect(res).toEqual('Error: the rotation is *not existing*, please make sure. use `/onebot rotations`.')
    })
  })
})
