import { RotationRepository } from '@/script-properties'
import { Actable } from '@/actuators/iocActuator'

export interface ListRotationDeps {
  readonly rotationRepository: Pick<RotationRepository, 'get'>
}

export interface ListRotation {
  (spaceName: string): string
}

export const listRotation: Actable<ListRotationDeps, ListRotation> = function (spaceName) {
  const rotationItems = this.rotationRepository.get(spaceName)
  if (rotationItems.length) {
    return rotationItems
      .map((item) => ({ ...item, participants: item.participants.join(', ') }))
      .map((item) => `[${item.id}] ${item.title} "${item.timer}" "${item.participants}"`)
      .join('\n')
  } else {
    return 'Currently, there is *no rotation configured* in this space.'
  }
}
