import { createSpaceRepository, SpaceRepository } from '@/repositories'

export const spaceRepository: SpaceRepository = createSpaceRepository({ propertiesService: PropertiesService })
