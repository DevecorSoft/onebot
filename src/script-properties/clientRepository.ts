import { Client, PersistentClient } from '@/feishu/resources'
import { Deps } from './deps'

export const propertyName = 'PersistentClient'

type ClientProperties = Record<string, Client>

export const createClientRepository: (deps: Deps) => PersistentClient = ({ propertiesService }) => {
  const properties = propertiesService.getScriptProperties()

  function clientProperties(): ClientProperties | null {
    return JSON.parse(properties.getProperty(propertyName) ?? 'null') as ClientProperties | null
  }

  return {
    add: (client) => {
      const clients = clientProperties()
      properties.setProperty(propertyName, JSON.stringify({...clients, [client.id]: client}))
    },
    get: (id) => {
      const clients = clientProperties() ?? {}
      return clients[id] ?? null
    }
  }
}
