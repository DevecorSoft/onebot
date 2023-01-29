import { RotationRepository } from '@/repositories'
import { Actable } from '@/actuators/iocActuator'
import { Either, match, tryCatch } from 'fp-ts/Either'
import { CronTime } from '@/actuators/cron'
import { pipe } from 'fp-ts/function'

export interface AddRotationDeps {
  readonly rotationIdSupplier: () => string
  readonly rotationRepository: Pick<RotationRepository, 'add'>
  readonly cronTime: (source: string, zone: string) => CronTime
}

export interface AddRotation {
  (title: string, timer: string, participants: string, spaceName: string, threadName: string): string
}

export const addRotation: Actable<AddRotationDeps, AddRotation> = function (
  title,
  timer,
  participants,
  spaceName,
  threadName
) {
  const validateTimer = (timer: string): Either<string, string> =>
    tryCatch(
      () => {
        this.cronTime(timer, 'Asia/Shanghai')
        return timer
      },
      () => 'Error: the cron time is *invalid*, please make sure. See https://crontab.guru/'
    )

  return pipe(
    timer,
    validateTimer,
    match(
      (e) => e,
      (timer) => {
        const rotation_id = this.rotationIdSupplier()
        this.rotationRepository.add({
          id: rotation_id,
          title,
          timer,
          participants: participants.split(',').map((e) => e.trim()),
          thread: threadName
        }, spaceName)
        return 'your rotation *added*.'
      }
    )
  )
}
