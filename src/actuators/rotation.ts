import { stdAddRotationActuator } from '@/factories/rotation-add'
import { stdDefaultRotationActuator } from '@/factories/rotation-default'
import { stdDeleteRotationActuator } from '@/factories/rotation-delete'
import { stdListRotationActuator } from '@/factories/rotation-list'
import { stdSkipRotationActuator } from '@/factories/rotation-skip'
import { Actable, Context } from './iocContainer'
import { LengthValidator } from '@/actuators/validator'

export interface RotationDeps {
  readonly lengthValidator: LengthValidator
}

const RotationAction: Actable<RotationDeps> = function (...args) {
  if (args.length === 2) {
    return stdListRotationActuator.act(args[0])
  } else {
    if (args[0] === 'add') {
      return this.lengthValidator([5], args.slice(1))
        .validate()
        .execute(() => stdAddRotationActuator.act(...args.slice(1) as [string, string, string, string, string]))
    } else if (args[0] === 'skip') {
      const skipArgs = args.slice(1, -1)
      if (skipArgs.length === 2) {
        return stdSkipRotationActuator.act(skipArgs[1], skipArgs[0])
      } else if (skipArgs.length === 3) {
        return stdSkipRotationActuator.act(skipArgs[2], skipArgs[0], skipArgs[1])
      }
      return this.lengthValidator([2, 3], skipArgs)
        .validate()
        .execute(() => '')
    } else if (args[0] === 'delete') {
      const [id, spaceName] = args.slice(1, -1)
      return stdDeleteRotationActuator.act(id, spaceName)
    } else {
      return stdDefaultRotationActuator.act(...args as [string])
    }
  }
}

export type RotationActuator = Context<RotationDeps>

export const createRotationActuator = (deps: RotationDeps): RotationActuator => ({
  action: RotationAction,
  deps,
})
