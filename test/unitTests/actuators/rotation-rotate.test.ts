import { createActuator } from '@/actuators/iocActuator'
import { rotateRotations } from '@/actuators/rotation-rotate'

describe('Given the chatbot is triggered hourly', () => {
  describe('When rotate rotations', () => {
    it('Then should tell user the current status of rotation', () => {
      const getById = jest.fn().mockReturnValueOnce({
        id: 'df37a860-15a4-11ed-bd15-7b63jfnex0d86',
        title: 'The Daily facilitator',
        timer: '0 0 10 1-5 *',
        participants: ['Devecor Crazy', 'Jon Geller', 'Mike'],
        thread: 'spaces/AAABAndVxU/threads/I--cu_wca78',
      })
      const msg = createActuator(rotateRotations, { rotationRepository: { getById, update: jest.fn() } })
        .act('df37a860-15a4-11ed-bd15-7b63jfnex0d86', 'spaces/ABDEXXXX')

      expect(msg).toEqual('The facilitator of "`The Daily facilitator`" is @Devecor Crazy, next will be @Jon Geller.')
    })

    it('Then should rotate', () => {
      const getById = jest.fn().mockReturnValueOnce({
        id: 'df37a860-15a4-11ed-bd15-7b63jfnex0d86',
        title: 'The Daily facilitator',
        timer: '0 0 10 1-5 *',
        participants: ['Devecor Crazy', 'Jon Geller', 'Mike'],
        thread: 'spaces/AAABAndVxU/threads/I--cu_wca78',
      })

      const update = jest.fn()

      createActuator(rotateRotations, { rotationRepository: { getById, update } })
        .act('df37a860-15a4-11ed-bd15-7b63jfnex0d86', 'spaces/ABDEXXXX')

      expect(update).toBeCalledTimes(1)
      expect(update).toBeCalledWith({
        id: 'df37a860-15a4-11ed-bd15-7b63jfnex0d86',
        title: 'The Daily facilitator',
        timer: '0 0 10 1-5 *',
        participants: ['Jon Geller', 'Mike', 'Devecor Crazy'],
        thread: 'spaces/AAABAndVxU/threads/I--cu_wca78',
      }, 'spaces/ABDEXXXX')
    })
  })
})
