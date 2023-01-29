import { RotationRepository } from '@/repositories'
import { Context, Actable } from './iocContainer'
import { LengthValidator } from './validator'

export interface SkipRotationDeps {
  readonly rotationRepository: Pick<RotationRepository, 'getById' | 'update'>
  readonly lengthValidator: LengthValidator
}

const SkipRotationAction: Actable<SkipRotationDeps> = function (...args: string[]) {
  return this.lengthValidator([2, 3], args)
    .validate()
    .execute(() => {
      const id = args[0]
      const n = args.length === 2 ? '1' : args[1]
      const spaceName = args[args.length - 1]
      const rotation = this.rotationRepository.getById(id, spaceName)

      if (!rotation) {
        return 'Error: the rotation is *not existing*, please make sure. use `/onebot rotations`.'
      }

      const skip_count = parseInt(n)
      const skipped_participants = rotation.participants.slice(0, skip_count)
      const rest_participants = rotation.participants.slice(skip_count)
      this.rotationRepository.update({ ...rotation, participants: rest_participants.concat(skipped_participants) }, spaceName)
      return `${n} participant(s) of "\`${rotation.title}\`" was *skipped*, next will be @${rest_participants[0]}.`
    })
}

export type SkipRotationActuator = Context<SkipRotationDeps>

export const createSkipRotationActuator = (deps: SkipRotationDeps): SkipRotationActuator => ({
  action: SkipRotationAction,
  deps,
})
