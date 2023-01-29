import { AddSpaceActuator, createAddSpaceActuator } from '@/actuators/space-add'
import { spaceRepository } from './spaceRepository'

export const stdAddSpaceActuator: AddSpaceActuator = createAddSpaceActuator({ spaceRepository })
