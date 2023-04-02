import express from 'express'
import { client } from '@/feishu/resources'
import { createClientRepository } from '@/script-properties'
import { storage } from '@/feishu/persistentce'

export const app = express()
app.use(express.json())
app.use(client(createClientRepository({ propertiesService: storage })))
