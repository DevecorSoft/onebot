import { RotationRepository } from '@/script-properties'
import { Actable } from './iocActuator'

export interface RotateRotationsDeps {
  readonly rotationRepository: Pick<RotationRepository, 'getById' | 'update'>
}

export interface RotateRotations {
  (rotationId: string, spaceName: string): string
}

export const rotateRotations: Actable<RotateRotationsDeps, RotateRotations> = function (rotationId, spaceName) {
  const rotationItem = this.rotationRepository.getById(rotationId, spaceName)!
  const currentParticipant = rotationItem.participants[0]
  const nextParticipant = rotationItem.participants[1]
  this.rotationRepository.update(
    { ...rotationItem, participants: rotationItem.participants.slice(1).concat([currentParticipant]) },
    spaceName
  )
  return `The facilitator of "\`${rotationItem.title}\`" is @${currentParticipant}, next will be @${nextParticipant}.`
}
