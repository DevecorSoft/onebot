import { RotationRepository } from '@/repositories'
import { Actable } from '@/actuators/iocActuator'

export interface DeleteRotationDeps {
  readonly rotationRepository: Pick<RotationRepository, 'deleteById'>
}

export interface DeleteRotation {
  (id: string, spaceName: string): string
}

export const deleteRotation: Actable<DeleteRotationDeps, DeleteRotation> = function (id, spaceName) {
  const rotationItem = this.rotationRepository.deleteById(id, spaceName)
  const errorMsg = 'Error: the rotation is *not existing*, please make sure. use `/onebot rotations`.'
  return rotationItem ? `The rotation of "\`${rotationItem.title}\`" was *dropped*.` : errorMsg
}
