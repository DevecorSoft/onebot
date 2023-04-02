import { RequestHandler, Router } from 'express'

interface Client {
  challenge: string
  token: string
  type: string
}

const post: RequestHandler<Record<string, never>, { challenge: string }, Client> =
  (req, res) => {
    res.send({challenge: req.body.challenge})
  }

export const client = Router()
client.post('/client', post)
