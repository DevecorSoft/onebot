import { traverseRotations } from '@/actuators/trigger-traverse-rotations'
import { createActuator } from '@/actuators/iocActuator'

describe('Given the chatbot is triggered hourly', () => {
  describe('When traverse rotations', () => {
    const rotationItems = [
      {
        id: 'df37a860-15a4-11ed-bd15-7b630f540d86',
        title: 'my title',
        timer: '10 1-5 *',
        participants: ['devecor', 'someone', 'Mike'],
        thread: 'spaces/AADDDDMxU/threads/I--cu_wca78',
      },
      {
        id: 'df37a860-15a4-11ed-xxxx-7b630f540d86',
        title: 'another rotation',
        timer: '1-5 *',
        participants: ['Jon', 'someone', 'Mike'],
        thread: 'spaces/AAABaxOMxU/threads/I--cu_wca78',
      },
    ]

    const spaces: string[] = ['space1', 'space2']
    const spaceRepository = { get: jest.fn().mockReturnValue(spaces) }
    const rotationRepository = { get: jest.fn().mockReturnValue(rotationItems) }

    it('Then should traverse all rotation in spaces', () => {
      const evaluateTimerActuator = { act: jest.fn() }

      createActuator(traverseRotations, {
          spaceRepository,
          rotationRepository,
          evaluateTimerActuator,
          postMessageActuator: { act: jest.fn() },
          rotateRotationActuator: { act: jest.fn() }
        }
      ).act()

      expect(spaceRepository.get).toBeCalledTimes(1)
      expect(rotationRepository.get).toBeCalledTimes(2)
      expect(rotationRepository.get).toHaveBeenNthCalledWith(1, 'space1')
      expect(rotationRepository.get).toHaveBeenNthCalledWith(2, 'space2')
      expect(evaluateTimerActuator.act).toBeCalledTimes(4)
    })

    it('Then should involve rotate actuator', () => {
      const rotateRotationActuator = { act: jest.fn().mockReturnValue('The Daily facilitator is @deveocr, next will be @someone') }
      const postMessage = jest.fn();
      createActuator(traverseRotations, {
          spaceRepository,
          rotationRepository,
          evaluateTimerActuator: { act: jest.fn().mockReturnValue(true) },
          postMessageActuator: { act: postMessage },
          rotateRotationActuator
        }
      ).act()

      expect(rotateRotationActuator.act).toBeCalled()
      expect(postMessage).toHaveBeenNthCalledWith(
        1,
        'The Daily facilitator is @deveocr, next will be @someone',
        'space1',
        'spaces/AADDDDMxU/threads/I--cu_wca78'
      )
      expect(postMessage).toHaveBeenNthCalledWith(
        4,
        'The Daily facilitator is @deveocr, next will be @someone',
        'space2',
        'spaces/AAABaxOMxU/threads/I--cu_wca78'
      )
    })

    it('Then should post message when time is up', () => {
      const evaluateTimerActuator = { act: jest.fn().mockReturnValue(true) }
      const postMessageActuator = { act: jest.fn() }

      createActuator(traverseRotations, {
        spaceRepository,
        rotationRepository,
        evaluateTimerActuator,
        postMessageActuator,
        rotateRotationActuator: { act: jest.fn() }
      }).act()

      expect(postMessageActuator.act).toBeCalledTimes(4)
    })

    it('Then should not post message when it is too soon', () => {
      const evaluateTimerActuator = { act: jest.fn().mockReturnValue(false) }
      const postMessageActuator = { act: jest.fn() }

      createActuator(traverseRotations, {
        spaceRepository,
        rotationRepository,
        evaluateTimerActuator,
        postMessageActuator,
        rotateRotationActuator: { act: jest.fn() }
      }).act()

      expect(postMessageActuator.act).toBeCalledTimes(0)
    })
  })
})
