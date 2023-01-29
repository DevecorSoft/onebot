import { createListRotationActuator, ListRotationActuator } from '@/actuators/rotation-list'
import { rotationRepository } from './rotationRepository'

export const stdListRotationActuator: ListRotationActuator = createListRotationActuator({ rotationRepository })
