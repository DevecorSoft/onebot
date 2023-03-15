import { rotationRepository } from './rotationRepository'
import { skipRotation } from '@/actuators/rotation-skip'
import { createActuator } from '@/actuators/iocActuator'

export const stdSkipRotationActuator = createActuator(skipRotation, {
  rotationRepository
})
