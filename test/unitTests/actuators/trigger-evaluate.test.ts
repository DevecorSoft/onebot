import { isTimeUp } from '@/actuators/trigger-evaluate-timer'
import { createActuator } from '@/actuators/iocActuator'
import { time } from '@Devecorsoft/cron'

describe('Given the bot triggered by a time-driven trigger', () => {
  describe('When evaluate timer of rotations', () => {
    const cronTime = time

    it('Then should return false when remaining time more than the period', () => {
      const result = createActuator(isTimeUp, { cronTime }).act('0 10 * * 1-5', new Date('2022-09-04T10:13:00+08:00'), 60 * 60)
      expect(result).toEqual(false)
    })

    it('Then should return true when remaining time less than the period', () => {
      const result = createActuator(isTimeUp, { cronTime }).act('0 10 * * 1-5', new Date('2022-09-05T09:00:01+08:00'), 60 * 60)
      expect(result).toEqual(true)
    })

    it('Then should return true when remaining time equal the period', () => {
      const result = createActuator(isTimeUp, { cronTime }).act('0 10 * * 1-5', new Date('2022-09-05T09:00:00+08:00'), 60 * 60)
      expect(result).toEqual(true)
    })

    it('Then should return false when remaining time is zero', () => {
      const result = createActuator(isTimeUp, { cronTime }).act('0 10 * * 1-5', new Date('2022-09-05T10:00:00+08:00'), 60 * 60)
      expect(result).toEqual(false)
    })
  })
})
