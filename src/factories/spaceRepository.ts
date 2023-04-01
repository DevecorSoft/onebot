import { createSpaceRepository, SpaceRepository } from '@/script-properties'

export const spaceRepository: SpaceRepository = createSpaceRepository({ propertiesService: PropertiesService })
