import { Client } from '@/feishu/model'
import { Repository } from '@/common'

export interface ClientDomain {
  add: (client: Client) => void
}

export const ClientDomain: (repo: Repository<Client>) => ClientDomain = ({create}) => ({
  add: create
})
