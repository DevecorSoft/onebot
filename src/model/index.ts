export type ChatIdentity = 'wecom' | 'google chat' | 'feishu' | 'slack'

export interface Space {
  readonly id: string
  readonly chatIdentity: ChatIdentity
  readonly spaceIdentity: unknown
  readonly thread?: unknown
}

export interface Rotation {
  readonly id: string
  readonly title: string
  readonly schedule: string
  readonly participants: Participant[]
  readonly space: string
}

export interface Member {
  readonly name: string
  readonly at?: string
}

export interface Participant extends Member {
  readonly meta?: Record<string, unknown>
}
