export interface Repository<T> {
  readonly create: (entity: T) => void
}
