import { LengthValidator } from '@/actuators/validator'
import { rotationRepository } from './rotationRepository'
import { createActuator } from '@/actuators/iocActuator'
import { deleteRotation } from '@/actuators/rotation-delete'

export const stdDeleteRotationActuator = createActuator(deleteRotation, {
  rotationRepository,
  lengthValidator: LengthValidator,
})
