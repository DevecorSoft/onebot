export interface ChatIdentity {
  readonly name: 'wecom' | 'google chat' | 'feishu' | 'slack'
  readonly space: string
  readonly thread?: string
}

export interface Rotation {
  readonly id: string
  readonly title: string
  readonly schedule: string
  readonly participants: string[]
  readonly space: string
}

export interface Participant {
  readonly name: string
  readonly at?: string
}
