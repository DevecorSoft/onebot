import { SpaceRepository } from '@/repositories/spaceRepository'
import { Actable } from '@/actuators/iocActuator'

export interface RemoveSpaceDeps {
  readonly spaceRepository: Pick<SpaceRepository, 'remove'>
}

export interface RemoveSpace {
  (spaceName: string): void
}

export const removeSpace: Actable<RemoveSpaceDeps, RemoveSpace> = function (spaceName: string) {
    this.spaceRepository.remove(spaceName)
}
