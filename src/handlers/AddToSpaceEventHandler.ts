import { stdAddSpaceActuator } from '@/factories/space-add'
import { SpaceEvent, TextMessage } from './types'

export const addToSpaceEventHandler = (event: SpaceEvent): TextMessage => {
  stdAddSpaceActuator.act(event.space.name)
  return { text: 'Hi! Thanks for adding me! Use /onebot to see the helps.' }
}
