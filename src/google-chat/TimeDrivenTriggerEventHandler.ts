import { stdTraverseRotationsActuator } from '@/factories/trigger-traverse-rotations'

export const timeDrivenTriggerEventHandler: () => void = () => stdTraverseRotationsActuator.act()
