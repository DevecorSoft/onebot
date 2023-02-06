import { SpaceRepository } from '@/repositories/spaceRepository'
import { Actable } from '@/actuators/iocActuator'

export interface AddSpaceDeps {
  readonly spaceRepository: Pick<SpaceRepository, 'push'>
}

export interface AddSpace {
  (spaceName: string): void
}

export const addSpace: Actable<AddSpaceDeps, AddSpace> = function (spaceName) {
  this.spaceRepository.push(spaceName)
}
