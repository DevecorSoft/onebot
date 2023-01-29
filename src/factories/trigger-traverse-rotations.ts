import { Actuator, createActuator } from '@/actuators/iocActuator'
import { traverseRotations, TraverseRotations } from '@/actuators/trigger-traverse-rotations'
import { spaceRepository } from '@/factories/spaceRepository'
import { rotationRepository } from '@/factories/rotationRepository'
import { stdPostMessageActuator } from '@/factories/trigger-post-message'
import { stdEvaluateTimerActuator } from '@/factories/trigger-evaluate-timer'
import { stdRotateRotationActuator } from '@/factories/rotation-rotate'

export const stdTraverseRotationsActuator: Actuator<TraverseRotations> = createActuator(traverseRotations, {
  spaceRepository,
  rotationRepository,
  evaluateTimerActuator: stdEvaluateTimerActuator,
  postMessageActuator: stdPostMessageActuator,
  rotateRotationActuator: stdRotateRotationActuator,
})
