import { createRotationRepository, RotationRepository } from '@/script-properties'

export const rotationRepository: RotationRepository = createRotationRepository({ propertiesService: PropertiesService })
