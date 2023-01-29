import { createRotationActuator, RotationActuator } from '@/actuators/rotation'
import { LengthValidator } from '@/actuators/validator'

export const stdRotationActuator: RotationActuator = createRotationActuator({
  lengthValidator: LengthValidator,
})
