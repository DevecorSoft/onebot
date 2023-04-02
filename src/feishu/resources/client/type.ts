export interface Client {
  id: string
  challenge: string
  token: string
  type: string
}

export interface PersistentClient {
  add: (client: Client) => void
  get: (id: string) => Client | null
}
