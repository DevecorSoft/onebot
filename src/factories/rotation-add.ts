import { addRotation } from '@/actuators/rotation-add'
import { rotationRepository } from './rotationRepository'
import { time } from '@/factories/CronTime'
import { createActuator } from '@/actuators/iocActuator'

export const stdAddRotationActuator = createActuator(addRotation, {
  rotationIdSupplier: Utilities.getUuid,
  rotationRepository: rotationRepository,
  cronTime: time,
})
