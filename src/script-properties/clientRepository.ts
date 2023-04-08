import { Deps } from './deps'
import { Client } from '@/feishu/model'
import { Repository } from '@/common'

export const clientPropertyName = 'PersistentClient'

type ClientProperties = Record<string, Client>

export const createClientRepository: (deps: Deps) => Repository<Client> = ({ propertiesService }) => {
  const properties = propertiesService.getScriptProperties()

  function clientProperties(): ClientProperties | null {
    return JSON.parse(properties.getProperty(clientPropertyName) ?? 'null') as ClientProperties | null
  }

  return {
    create: (client) => {
      const clients = clientProperties()
      properties.setProperty(clientPropertyName, JSON.stringify({...clients, [client.id]: client}))
    },
    get: (id: string) => {
      const clients = clientProperties() ?? {}
      return clients[id] ?? null
    }
  }
}
