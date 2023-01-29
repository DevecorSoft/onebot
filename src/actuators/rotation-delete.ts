import { RotationRepository } from '@/repositories'
import { Context, Actable } from './iocContainer'
import { LengthValidator } from './validator'

export interface DeleteRotationDeps {
  readonly rotationRepository: Pick<RotationRepository, 'deleteById'>
  readonly lengthValidator: LengthValidator
}

const DeleteRotationAction: Actable<DeleteRotationDeps> = function (...args: string[]) {
  return this.lengthValidator([2], args)
    .validate()
    .execute(() => {
      const [id, spaceName] = args
      const rotationItem = this.rotationRepository.deleteById(id, spaceName)
      const errorMsg = 'Error: the rotation is *not existing*, please make sure. use `/onebot rotations`.'
      return rotationItem ? `The rotation of "\`${rotationItem.title}\`" was *dropped*.` : errorMsg
    })
}

export type DeleteRotationActuator = Context<DeleteRotationDeps>

export const createDeleteRotationActuator = (deps: DeleteRotationDeps): DeleteRotationActuator => ({
  action: DeleteRotationAction,
  deps,
})
