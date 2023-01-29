import { defaultRotation } from '@/actuators/rotation-default'
import { createActuator } from "@/actuators/iocActuator";

export const stdDefaultRotationActuator = createActuator(defaultRotation, {})
