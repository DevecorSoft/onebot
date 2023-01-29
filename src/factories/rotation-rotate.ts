import { createActuator } from '@/actuators/iocActuator'
import { rotateRotations } from '@/actuators/rotation-rotate'
import { rotationRepository } from '@/factories/rotationRepository'

export const stdRotateRotationActuator = createActuator(rotateRotations, { rotationRepository: rotationRepository })
