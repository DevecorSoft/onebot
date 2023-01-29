import { Deps } from './deps'

export interface SpaceRepository {
  readonly push: (spaceName: string) => void
  readonly remove: (spaceName: string) => void
  readonly get: () => string[]
}

export const createSpaceRepository = (deps: Deps): SpaceRepository => {
  const scriptProperties = deps.propertiesService.getScriptProperties()
  const getTriggerList = () => JSON.parse(scriptProperties.getProperty('trigger_list') || '[]') as string[]

  return {
    push: (spaceName) => {
      const spaces = getTriggerList()
      spaces.push(spaceName)
      scriptProperties.setProperty('trigger_list', JSON.stringify(spaces))
    },
    remove: (spaceName) => {
      const spaces = getTriggerList()
      scriptProperties.setProperty('trigger_list', JSON.stringify(spaces.filter((val) => val !== spaceName)))
    },
    get: getTriggerList
  }
}
