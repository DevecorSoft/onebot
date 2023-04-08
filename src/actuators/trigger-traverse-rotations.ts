import { Actable, Actuator } from '@/actuators/iocActuator'
import { RotationRepository, LegacySpaceRepository } from '@/script-properties'
import { PostMessage } from '@/actuators/trigger-post-message'
import { EvaluateTimer } from '@/actuators/trigger-evaluate-timer'
import { RotateRotations } from "@/actuators/rotation-rotate";

export interface TraverseRotationsDeps {
  readonly spaceRepository: Pick<LegacySpaceRepository, 'get'>
  readonly rotationRepository: Pick<RotationRepository, 'get'>
  readonly evaluateTimerActuator: Actuator<EvaluateTimer>
  readonly postMessageActuator: Actuator<PostMessage>
  readonly rotateRotationActuator: Actuator<RotateRotations>
}

export interface TraverseRotations {
  (): void
}

export const traverseRotations: Actable<TraverseRotationsDeps, TraverseRotations> = function () {
  this.spaceRepository.get().forEach((spaceName) => {
    this.rotationRepository.get(spaceName).forEach((item) => {
      if (this.evaluateTimerActuator.act(item.timer, new Date())) {
        const msg = this.rotateRotationActuator.act(item.id, spaceName)
        console.log(msg)
        this.postMessageActuator.act(msg, spaceName, item.thread)
      }
    })
  })
}
