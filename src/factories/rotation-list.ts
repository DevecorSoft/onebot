import { createActuator } from '@/actuators/iocActuator'
import { listRotation } from '@/actuators/rotation-list'
import { rotationRepository } from '@/factories/rotationRepository'

export const stdListRotationActuator = createActuator(listRotation, { rotationRepository })
