import { executeActuator } from '@/actuators/iocContainer'
import { stdRemoveSpaceActuator } from '@/factories/space-remove'
import { SpaceEvent } from './types'

export const removeFromSpaceEventHandler = (event: SpaceEvent): void => {
  executeActuator(stdRemoveSpaceActuator, event.space.name)
}
