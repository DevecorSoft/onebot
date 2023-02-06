import { spaceRepository } from './spaceRepository'
import { createActuator } from '@/actuators/iocActuator'
import { addSpace } from '@/actuators/space-add'

export const stdAddSpaceActuator = createActuator(addSpace, { spaceRepository })
