import { Space } from '@/model'
import { Repository } from '@/common'

export interface SpaceDomain {
  readonly add: (space: Space) => void
}

export const SpaceDomain: (repo: Repository<Space>) => SpaceDomain = ({ create }) => ({
  add(space) {
    create(space)
  }
})
