import express from 'express'
import { client } from '@/feishu/resources'
import { createClientRepository } from '@/script-properties'
import { storage } from '@/feishu/persistentce'
import { ClientDomain } from '@/feishu/domain'
import { SpaceDomain } from '@/domain/space'
import { SpaceRepository } from '@/script-properties/spaceRepository'

export const app = express()
app.use(express.json())
const propertiesService = { propertiesService: storage }
const clientRepo = createClientRepository(propertiesService)
const spaceRepo = SpaceRepository(propertiesService)

app.use('/api/v1/feishu', client({
  client: ClientDomain(clientRepo),
  space: SpaceDomain(spaceRepo)
}))
