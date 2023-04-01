import { Deps } from "./deps"

export interface RotationItem {
  readonly id: string
  readonly title: string
  readonly timer: string
  readonly participants: string[]
  readonly thread: string
}

export interface SpaceStorage {
  readonly rotations: RotationItem[]
}

export interface RotationRepository {
  readonly add: (item: RotationItem, spaceName: string) => void
  readonly get: (spaceName: string) => RotationItem[]
  readonly getById: (id: string, spaceName: string) => RotationItem | null
  readonly update: (item: RotationItem, spaceName: string) => void
  readonly deleteById: (id: string, spaceName: string) => RotationItem | null
}

export function createRotationRepository({ propertiesService }: Deps): RotationRepository {
  return {
    add: (item, spaceName) => {
      const existing = getRotations(propertiesService, spaceName)
      existing.push(item)
      propertiesService.getScriptProperties().setProperty(spaceName, JSON.stringify({ rotations: existing }))
    },
    get: (spaceName) => {
      return getRotations(propertiesService, spaceName)
    },
    getById: (id, spaceName) => {
      const existingRotations = getRotations(propertiesService, spaceName)
      return existingRotations.find((e) => e.id === id) || null
    },
    update: (item, spaceName) => {
      const existingRotations = getRotations(propertiesService, spaceName)
      const index = existingRotations.findIndex((e) => e.id === item.id)
      existingRotations.fill(item, index, index + 1)
      propertiesService.getScriptProperties().setProperty(spaceName, JSON.stringify({ rotations: existingRotations }))
    },
    deleteById: (id, spaceName) => {
      const spaceStorage = getSpaceStorage(propertiesService, spaceName)
      const rotationStore = spaceStorage?.rotations || []
      const rotation = rotationStore.find((val) => val.id === id)
      rotation && propertiesService.getScriptProperties().setProperty(spaceName, JSON.stringify({...spaceStorage, rotations: rotationStore.filter((val) => val.id !== id)}))
      return rotation || null
    }
  }
}

function getRotations(propertiesService: Pick<PropertiesService, 'getScriptProperties'>, spaceName: string): RotationItem[] {
  const spaceStorage = getSpaceStorage(propertiesService, spaceName)
  return spaceStorage?.rotations || []
}

function getSpaceStorage(propertiesService: Pick<PropertiesService, 'getScriptProperties'>, spaceName: string) {
  return JSON.parse(propertiesService.getScriptProperties().getProperty(spaceName) || 'null') as SpaceStorage | null
}
