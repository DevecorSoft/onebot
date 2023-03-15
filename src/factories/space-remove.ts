import { spaceRepository } from './spaceRepository'
import { createActuator } from '@/actuators/iocActuator'
import { removeSpace } from '@/actuators/space-remove'

export const stdRemoveSpaceActuator = createActuator(removeSpace, { spaceRepository })
