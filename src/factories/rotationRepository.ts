import { createRotationRepository, RotationRepository } from '@/repositories'

export const rotationRepository: RotationRepository = createRotationRepository({ propertiesService: PropertiesService })
