import { createActuator } from '@/actuators/iocActuator'
import { skipRotation } from '@/actuators/rotation-skip'

describe('Given user have rotations added', () => {
  describe('When user want to adjust specific rotation by skip subcommand', () => {
    it('Then should skip participants', () => {
      const spaceName = 'space name 5231'
      const id = '0dd5aba3-6234-417a-87c4-2138e78556cd'
      const n = '2'

      const getByRotationId = jest.fn().mockReturnValueOnce({
        id: '0dd5aba3-6234-417a-87c4-2138e78556cd',
        title: 'The title',
        timer: '1-5 *',
        participants: ['devecor', 'someone', 'Mike', 'Bob'],
      })
      const updateRotation = jest.fn()
      const res = createActuator(skipRotation, {
          rotationRepository: { getById: getByRotationId, update: updateRotation },
        }).act(spaceName, id, n)


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
      const spaceName = 'space name 7341'
      const id = '0dd5aba3-6234-417a-87c4-2138e78556cd'

      const getByRotationId = jest.fn().mockReturnValueOnce({
        id: '0dd5aba3-6234-417a-87c4-2138e78556cd',
        title: 'The title',
        timer: '1-5 *',
        participants: ['devecor', 'someone', 'Mike', 'Bob'],
      })
      const updateRotation = jest.fn()
      const res = createActuator(skipRotation, {
        rotationRepository: { getById: getByRotationId, update: updateRotation },
      }).act(spaceName, id)

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
      const spaceName = 'space name 1234'
      const id = '0dd5aba3-6234-417a-87c4-2138e78556cd'

      const getByRotationId = jest.fn().mockReturnValueOnce(null)
      const updateRotation = jest.fn()
      const res = createActuator(skipRotation, {
        rotationRepository: { getById: getByRotationId, update: updateRotation },
      }).act(spaceName, id)

      expect(getByRotationId).toBeCalledTimes(1)
      expect(getByRotationId).toBeCalledWith('0dd5aba3-6234-417a-87c4-2138e78556cd', 'space name 1234')
      expect(updateRotation).toBeCalledTimes(0)
      expect(res).toEqual('Error: the rotation is *not existing*, please make sure. use `/onebot rotations`.')
    })
  })
})
