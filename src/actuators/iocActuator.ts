// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any) => any

/**
 * @deprecated
 */
export type Actable<D, F extends AnyFunction> = (this: D, ...args: Parameters<F>) => ReturnType<F>

/**
 * @deprecated
 */
export interface Actuator<F> {
  readonly act: F
}

/**
 * @deprecated
 * @param {Function} func func
 * @param {Object} deps deps
 * @returns {Object} obj
 */
export const createActuator = <D, F extends AnyFunction>(func: Actable<D, F>, deps: D): Actuator<F> & D => ({
  act: func as F,
  ...deps,
})
