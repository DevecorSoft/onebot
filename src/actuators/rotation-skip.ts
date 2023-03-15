import { RotationRepository } from '@/repositories'
import { Actable } from '@/actuators/iocActuator'

export interface SkipRotationDeps {
  readonly rotationRepository: Pick<RotationRepository, 'getById' | 'update'>
}

export interface SkipRotation {
  (spaceName: string, id: string, n?: string): string
}

export const skipRotation: Actable<SkipRotationDeps, SkipRotation> = function (spaceName: string, id: string, n = '1') {
  const rotation = this.rotationRepository.getById(id, spaceName)

  if (!rotation) {
    return 'Error: the rotation is *not existing*, please make sure. use `/onebot rotations`.'
  }

  const skip_count = parseInt(n)
  const skipped_participants = rotation.participants.slice(0, skip_count)
  const rest_participants = rotation.participants.slice(skip_count)
  this.rotationRepository.update({ ...rotation, participants: rest_participants.concat(skipped_participants) }, spaceName)
  return `${n} participant(s) of "\`${rotation.title}\`" was *skipped*, next will be @${rest_participants[0]}.`
}
