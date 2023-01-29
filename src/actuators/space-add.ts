import { SpaceRepository } from '@/repositories/spaceRepository'
import { Context, Actable } from './iocContainer'

export interface AddSpaceDeps {
  readonly spaceRepository: Pick<SpaceRepository, 'push'>
}

const AddSpaceAction: Actable<AddSpaceDeps, void> = function (spaceName: string) {
    this.spaceRepository.push(spaceName)
}

export type AddSpaceActuator = Context<AddSpaceDeps, void>

export const createAddSpaceActuator = (deps: AddSpaceDeps): AddSpaceActuator => ({
  action: AddSpaceAction,
  deps,
})
