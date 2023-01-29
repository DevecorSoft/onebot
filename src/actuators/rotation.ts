import { stdAddRotationActuator } from '@/factories/rotation-add'
import { stdDefaultRotationActuator } from '@/factories/rotation-default'
import { stdDeleteRotationActuator } from '@/factories/rotation-delete'
import { stdListRotationActuator } from '@/factories/rotation-list'
import { stdSkipRotationActuator } from '@/factories/rotation-skip'
import { Context, executeActuator, Actable } from './iocContainer'
import { LengthValidator } from '@/actuators/validator'

export interface RotationDeps {
  readonly lengthValidator: LengthValidator
}

const RotationAction: Actable<RotationDeps> = function (...args) {
  if (args.length === 2) {
    return executeActuator(stdListRotationActuator, args[0])
  } else {
    switch (args[0]) {
      case 'add':
        return this.lengthValidator([5], args.slice(1))
          .validate()
          .execute(() => stdAddRotationActuator.act(...args.slice(1) as [string, string, string, string, string]))
      case 'skip':
        return executeActuator(stdSkipRotationActuator, ...args.slice(1, -1))
      case 'delete':
        return executeActuator(stdDeleteRotationActuator, ...args.slice(1, -1))
      default:
        return stdDefaultRotationActuator.act(...args as [string])
    }
  }
}

export type RotationActuator = Context<RotationDeps>

export const createRotationActuator = (deps: RotationDeps): RotationActuator => ({
  action: RotationAction,
  deps,
})
