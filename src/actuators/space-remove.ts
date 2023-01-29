import { SpaceRepository } from '@/repositories/spaceRepository'
import { Context, Actable } from './iocContainer'

export interface RemoveSpaceDeps {
  readonly spaceRepository: Pick<SpaceRepository, 'remove'>
}

export const RemoveSpaceAction: Actable<RemoveSpaceDeps, void> = function (spaceName: string) {
    this.spaceRepository.remove(spaceName)
}

export type RemoveSpaceActuator = Context<RemoveSpaceDeps, void>

export const createRemoveSpaceActuator = (deps: RemoveSpaceDeps): RemoveSpaceActuator => ({
  action: RemoveSpaceAction,
  deps,
})