import express from 'express'
import { client } from '@/feishu/resources'
import { createClientRepository } from '@/script-properties'
import { storage } from '@/feishu/persistentce'

export const app = express()
app.use(express.json())
app.use('/api/v1/feishu', client(createClientRepository({ propertiesService: storage })))
