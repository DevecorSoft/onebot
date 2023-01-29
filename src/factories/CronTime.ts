import { CronTime } from '@/actuators/cron'

export const time = (cronTime: string, timeZone: string) => new CronTime(cronTime, timeZone)
