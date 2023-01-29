import { createRemoveSpaceActuator, RemoveSpaceActuator } from '@/actuators/space-remove'
import { spaceRepository } from './spaceRepository'

export const stdRemoveSpaceActuator: RemoveSpaceActuator = createRemoveSpaceActuator({ spaceRepository })
