import { executeActuator } from '@/actuators/iocContainer'
import { stdAddSpaceActuator } from '@/factories/space-add'
import { SpaceEvent, TextMessage } from './types'

export const addToSpaceEventHandler = (event: SpaceEvent): TextMessage => {
  executeActuator(stdAddSpaceActuator, event.space.name)
  return { text: 'Hi! Thanks for adding me! Use /onebot to see the helps.' }
}
