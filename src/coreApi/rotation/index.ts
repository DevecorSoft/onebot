import { Actuator, createActuator } from '@/actuators/iocActuator'
import { traverseRotations, TraverseRotations } from '@/actuators/trigger-traverse-rotations'
import { spaceRepository } from '@/factories/spaceRepository'
import { rotationRepository } from '@/factories/rotationRepository'
import { stdEvaluateTimerActuator } from '@/factories/trigger-evaluate-timer'
import { stdRotateRotationActuator } from '@/factories/rotation-rotate'
import { PostMessage } from '@/actuators/trigger-post-message'

export const tick: (messageActuator: Actuator<PostMessage>) => Actuator<TraverseRotations> = (messageActuator: Actuator<PostMessage>) => createActuator(traverseRotations, {
  spaceRepository,
  rotationRepository,
  evaluateTimerActuator: stdEvaluateTimerActuator,
  postMessageActuator: messageActuator,
  rotateRotationActuator: stdRotateRotationActuator,
})
