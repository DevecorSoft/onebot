import { createLegacySpaceRepository, LegacySpaceRepository } from '@/script-properties'

export const spaceRepository: LegacySpaceRepository = createLegacySpaceRepository({ propertiesService: PropertiesService })
