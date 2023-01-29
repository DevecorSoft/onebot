import { createDeleteRotationActuator, DeleteRotationActuator } from '@/actuators/rotation-delete'
import { LengthValidator } from '@/actuators/validator'
import { rotationRepository } from './rotationRepository'

export const stdDeleteRotationActuator: DeleteRotationActuator = createDeleteRotationActuator({
  rotationRepository,
  lengthValidator: LengthValidator,
})
