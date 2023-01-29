export interface Validator {
  validate: () => Fulfillment
}

export interface Fulfillment {
  readonly execute: (target: (...args: string[]) => string) => string
}

export type LengthValidator = (allows: number[], parameters: string[]) => Validator

export const LengthValidator: LengthValidator = (allows, parameters) => ({
  validate: () => {
    if (allows.includes(parameters.length)) {
      return { execute: (target) => target() }
    }

    const msg_too_many = 'Error: the number of parameters you typed was *more than needed*.'
    const msg_too_less = 'Error: required arguments are *missing* for this subcommand.'
    return {
      execute: () => (Math.max(...allows) < parameters.length ? msg_too_many : msg_too_less),
    }
  },
})
