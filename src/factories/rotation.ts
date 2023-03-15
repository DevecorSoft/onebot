import { LengthValidator } from '@/actuators/validator'
import { createActuator } from '@/actuators/iocActuator'
import { rotation } from '@/actuators/rotation'

export const stdRotationActuator = createActuator(rotation, {
  lengthValidator: LengthValidator
})
