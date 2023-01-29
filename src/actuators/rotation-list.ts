import { RotationRepository } from '@/repositories'
import { Context, Actable } from './iocContainer'

export interface ListRotationDeps {
  readonly rotationRepository: Pick<RotationRepository, 'get'>
}

const ListRotationAction: Actable<ListRotationDeps> = function (...args) {
  const [space_name] = args
  const rotationItems = this.rotationRepository.get(space_name)
  if (rotationItems.length) {
    return rotationItems
      .map((item) => ({ ...item, participants: item.participants.join(', ') }))
      .map((item) => `[${item.id}] ${item.title} "${item.timer}" "${item.participants}"`)
      .join('\n')
  } else {
    return 'Currently, there is *no rotation configured* in this space.'
  }
}

export type ListRotationActuator = Context<ListRotationDeps>

export const createListRotationActuator = (deps: ListRotationDeps): ListRotationActuator => ({
  action: ListRotationAction,
  deps,
})
