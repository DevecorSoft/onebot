import { Deps } from './deps'

export interface LegacySpaceRepository {
  readonly push: (spaceName: string) => void
  readonly remove: (spaceName: string) => void
  readonly get: () => string[]
}

export const createLegacySpaceRepository = (deps: Deps): LegacySpaceRepository => {
  const scriptProperties = deps.propertiesService.getScriptProperties()
  const getTriggerList = () => JSON.parse(scriptProperties.getProperty('spaces') || '[]') as string[]

  return {
    push: (spaceName) => {
      const spaces = getTriggerList()
      spaces.push(spaceName)
      scriptProperties.setProperty('spaces', JSON.stringify(spaces))
    },
    remove: (spaceName) => {
      const spaces = getTriggerList()
      scriptProperties.setProperty('spaces', JSON.stringify(spaces.filter((val) => val !== spaceName)))
    },
    get: getTriggerList
  }
}
