import { CronTime } from './cron'
import { DateTime } from 'luxon'
import { Actable } from '@/actuators/iocActuator'

export interface EvaluateTimerDeps {
  readonly cronTime: (source: string, zone: string) => CronTime
}

export interface EvaluateTimer {
  (timer: string, timeNow: Date, period?: number): boolean
}

export const isTimeUp: Actable<EvaluateTimerDeps, EvaluateTimer> = function (timer, timeNow, period = 3600) {
  const next = this.cronTime(timer, 'Asia/Shanghai').getNextDateFrom(timeNow, 'Asia/Shanghai')
  const remainingTime = next.toSeconds() - DateTime.fromJSDate(timeNow).toSeconds()
  console.log(`${remainingTime}: ${Math.floor(remainingTime / 3600)}h ${Math.floor((remainingTime % 3600) / 60)}m ${(remainingTime % 3600) % 60}s`)
  return remainingTime <= period
}
