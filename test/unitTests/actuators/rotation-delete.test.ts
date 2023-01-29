import { executeActuator } from '@/actuators/iocContainer'
import { createDeleteRotationActuator } from '@/actuators/rotation-delete'

describe('Given user have rotations added', () => {
  describe('When user want to drop specific rotation by delete subcommand', () => {
    it('Then should validate parameters first', () => {
      const args = ['0dd5aba3-6234-417a-87c4-2138e78556cd']
      const lengthValidator = jest.fn().mockReturnValueOnce({
        validate: () => ({
          execute: jest.fn(),
        }),
      })

      executeActuator(
        createDeleteRotationActuator({
          rotationRepository: { deleteById: jest.fn() },
          lengthValidator,
        }),
        ...args
      )

      expect(lengthValidator).toBeCalledTimes(1)
      expect(lengthValidator).toBeCalledWith([2], ['0dd5aba3-6234-417a-87c4-2138e78556cd'])
    })

    it('Then should drop rotation', () => {
      const args = ['0dd5aba3-6234-417a-87c4-2138e78556cd', 'space name 8645']
      const lengthValidator = jest.fn().mockReturnValueOnce({
        validate: () => ({
          execute: (target: () => void) => target(),
        }),
      })
      const deleteById = jest.fn().mockReturnValueOnce({
        id: '0dd5aba3-6234-417a-87c4-2138e78556cd',
        title: 'The dropped title',
        timer: '1-5 *',
        participants: 'Jon A, Someone B, Devecor C'.split(', '),
      })

      const res = executeActuator(
        createDeleteRotationActuator({
          rotationRepository: { deleteById },
          lengthValidator,
        }),
        ...args
      )

      expect(res).toEqual('The rotation of "`The dropped title`" was *dropped*.')
      expect(deleteById).toBeCalledTimes(1)
      expect(deleteById).toBeCalledWith(...args)
    })

    it('Then should tell user the rotation is not existing', () => {
      const args = ['0dd5aba3-6234-417a-87c4-2138e78556cd', 'space name 3563']
      const lengthValidator = jest.fn().mockReturnValueOnce({
        validate: () => ({
          execute: (target: () => void) => target(),
        }),
      })

      const deleteById = jest.fn().mockReturnValueOnce(null)

      const res = executeActuator(
        createDeleteRotationActuator({
          rotationRepository: { deleteById },
          lengthValidator,
        }),
        ...args
      )

      expect(deleteById).toBeCalledTimes(1)
      expect(deleteById).toBeCalledWith('0dd5aba3-6234-417a-87c4-2138e78556cd', 'space name 3563')
      expect(res).toEqual('Error: the rotation is *not existing*, please make sure. use `/onebot rotations`.')
    })
  })
})
