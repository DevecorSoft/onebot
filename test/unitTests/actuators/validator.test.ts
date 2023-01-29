import { LengthValidator } from '@/actuators/validator'

describe('Given user types a concrete subcommand', () => {
  describe('When required parameters are not fulfilled', () => {
    it('Then should tell user required argument is missing', () => {
      const result = LengthValidator([4], ['title', 'timer', 'participants'])
        .validate()
        .execute(() => 'valid')

      expect(result).toEqual('Error: required arguments are *missing* for this subcommand.')
    })

    it('Then should tell user required argument is missing', () => {
        const result = LengthValidator([2], ['title', 'timer', 'participants'])
          .validate()
          .execute(() => 'valid')

        expect(result).toEqual('Error: the number of parameters you typed was *more than needed*.')
      })
  })

  describe('When required parameters are fulfilled', () => {
    it('Then should execute the callback from parameter', () => {
      const result = LengthValidator([3], ['title', 'timer', 'participants'])
        .validate()
        .execute(() => 'valid')

      expect(result).toEqual('valid')
    })
  })
})
