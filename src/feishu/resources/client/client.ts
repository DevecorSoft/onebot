import { RequestHandler } from 'express'
import { Client, PersistentClient } from './type'

export interface ClientDeps extends Pick<PersistentClient, 'add'> {
  uuid: () => string
}

interface Payload {
  challenge: string
  token: string
  type: string
}

export const addClient: (deps: ClientDeps, client: Omit<Client, 'id'>) => void = (deps, client) => {
  deps.add({...client, id: deps.uuid()})
}

export const post: (deps: ClientDeps) => RequestHandler<Record<string, never>, { challenge: string }, Payload> =
  (deps) =>
    (req, res) => {
      const {challenge, type, token} = req.body
      addClient(deps, {challenge, type, token})
      res.send({challenge})
    }
