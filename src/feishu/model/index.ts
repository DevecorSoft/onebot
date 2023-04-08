export interface Client {
  readonly id: string
  readonly challenge: string
  readonly token: string
  readonly type: string
}
