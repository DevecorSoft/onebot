import { DateTime } from 'luxon'

export declare class CronTime {
  constructor(source: string | Date | DateTime, zone?: string, utcOffset?: string | number)

  public sendAt(): DateTime
  public sendAt(i?: number): DateTime | DateTime[]

  public getTimeout(): number

  public getNextDateFrom(start: Date | DateTime, zone?: string): DateTime
}
