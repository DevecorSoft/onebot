import { createActuator } from '@/actuators/iocActuator'
import { deleteRotation } from '@/actuators/rotation-delete'

describe('Given user have rotations added', () => {
  describe('When user want to drop specific rotation by delete subcommand', () => {

    it('Then should drop rotation', () => {
      const id = '0dd5aba3-6234-417a-87c4-2138e78556cd'
      const spaceName = 'space name 8645'
      const deleteById = jest.fn().mockReturnValueOnce({
        id: '0dd5aba3-6234-417a-87c4-2138e78556cd',
        title: 'The dropped title',
        timer: '1-5 *',
        participants: 'Jon A, Someone B, Devecor C'.split(', '),
      })

      const res =
        createActuator(deleteRotation, {
          rotationRepository: { deleteById },
        }).act(id, spaceName)

      expect(res).toEqual('The rotation of "`The dropped title`" was *dropped*.')
      expect(deleteById).toBeCalledTimes(1)
      expect(deleteById).toBeCalledWith(id, spaceName)
    })

    it('Then should tell user the rotation is not existing', () => {
      const id = '0dd5aba3-6234-417a-87c4-2138e78556cd'
      const spaceName = 'space name 3563'

      const deleteById = jest.fn().mockReturnValueOnce(null)

      const res = createActuator(deleteRotation, {
        rotationRepository: { deleteById },
      }).act(id, spaceName)

      expect(deleteById).toBeCalledTimes(1)
      expect(deleteById).toBeCalledWith('0dd5aba3-6234-417a-87c4-2138e78556cd', 'space name 3563')
      expect(res).toEqual('Error: the rotation is *not existing*, please make sure. use `/onebot rotations`.')
    })
  })
})
