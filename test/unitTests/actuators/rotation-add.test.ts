import { addRotation } from '@/actuators/rotation-add'
import { createActuator } from '@/actuators/iocActuator'

describe('Given user try to add a rotation', () => {
  const spaceName = 'space name 8754'
  const threadName = 'spaces/AAVBaccaexU/threads/I--cu_wpt68'

  it('should validate timer first', () => {
    const cronTime = jest.fn().mockImplementationOnce(() => {
      throw new Error('Too few fields')
    })

    const result = createActuator(addRotation, {
      rotationRepository: {
        add: jest.fn(),
      },
      rotationIdSupplier: jest.fn(),
      cronTime: cronTime,
    }).act('my title', '1-5 *', 'devecor, someone', spaceName, threadName)

    expect(result).toEqual('Error: the cron time is *invalid*, please make sure. See https://crontab.guru/')
  })

  it('should tell user his rotation added', () => {
    const rotationRepository = {
      add: jest.fn(),
    }
    const rotationIdSupplier = jest.fn().mockReturnValueOnce('df37a860-15a4-11ed-bd15-7b630f548888');

    const result = createActuator(addRotation, {
      rotationRepository,
      rotationIdSupplier,
      cronTime: jest.fn(),
    }).act('my title', '10 1-5 *', 'devecor, someone', spaceName, threadName)

    expect(result).toEqual('your rotation *added*.')
    expect(rotationIdSupplier).toBeCalledTimes(1)
    expect(rotationRepository.add).toBeCalledTimes(1)
    expect(rotationRepository.add).toBeCalledWith(
      {
        id: 'df37a860-15a4-11ed-bd15-7b630f548888',
        title: 'my title',
        timer: '10 1-5 *',
        participants: ['devecor', 'someone'],
        thread: threadName,
      },
      spaceName
    )
  })
})
