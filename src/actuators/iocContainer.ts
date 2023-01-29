export type Actable<D, R = string> = (this: D, ...args: string[]) => R

export interface Context<Deps, R = string> {
  readonly action: Actable<Deps, R>
  readonly deps: Deps
}

export const executeActuator = <Deps, R>(actuator: Context<Deps, R>, ...args: string[]): R => actuator.action.apply(actuator.deps, args)

export interface Actuator<R> {
  readonly act: (...args: string[]) => R
}

export const createActuator = <Deps, R>(action: Actable<Deps, R>, deps: Deps): Actuator<R> => ({
  act: (...args) => action.apply(deps, args)
})
