import { createSkipRotationActuator, SkipRotationActuator } from '@/actuators/rotation-skip'
import { LengthValidator } from '@/actuators/validator'
import { rotationRepository } from './rotationRepository'

export const stdSkipRotationActuator: SkipRotationActuator = createSkipRotationActuator({
  rotationRepository,
  lengthValidator: LengthValidator,
})
