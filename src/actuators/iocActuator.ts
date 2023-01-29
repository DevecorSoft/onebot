// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any) => any

export type Actable<D, F extends AnyFunction> = (this: D, ...args: Parameters<F>) => ReturnType<F>

export interface Actuator<F> {
  readonly act: F
}

export const createActuator = <D, F extends AnyFunction>(func: Actable<D, F>, deps: D): Actuator<F> & D => ({
  act: func as F,
  ...deps,
})
