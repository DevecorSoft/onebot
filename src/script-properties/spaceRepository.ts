import { Deps } from './deps'
import { Repository } from '@/common'
import { Space } from '@/model'

export const spacePropertyName = 'PersistentSpace'

type SpaceProperties = Record<string, Space>

export const SpaceRepository: (deps: Deps) => Repository<Space> = ({ propertiesService }) => {
  const properties = propertiesService.getScriptProperties()

  function spaceProperties(): SpaceProperties | null {
    return JSON.parse(properties.getProperty(spacePropertyName) ?? 'null') as SpaceProperties | null
  }

  return {
    create: (space) => {
      const spaces = spaceProperties()
      properties.setProperty(spacePropertyName, JSON.stringify({...spaces, [space.id]: space}))
    },
    get: (id: string) => {
      const clients = spaceProperties() ?? {}
      return clients[id] ?? null
    }
  }
}
