import express from 'express'
import { client } from '@/feishu/resources'

export const app = express()
app.use(express.json())
app.use(client)
