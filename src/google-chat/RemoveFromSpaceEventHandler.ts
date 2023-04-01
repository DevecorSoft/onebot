import { stdRemoveSpaceActuator } from '@/factories/space-remove'
import { SpaceEvent } from './types'

export const removeFromSpaceEventHandler = (event: SpaceEvent): void => {
  stdRemoveSpaceActuator.act(event.space.name)
}
