export interface TextMessage {
  readonly text: string
}

export interface SpacesMessage extends TextMessage {
  readonly thread: Thread
}

export interface Thread {
  readonly name: string
}

export interface SpaceEvent {
  readonly space: {
    readonly name: string
  }
}

export interface Event {
  readonly message?: {
    readonly name?: string
    readonly slashCommand?: {
      readonly commandId?: number
    }
    readonly sender?: {
      readonly name?: string
      readonly type?: 'HUMAN'
      readonly email?: string
      readonly domainId?: string
      readonly displayName?: string
      readonly avatarUrl?: string
    }
    readonly text?: string
    readonly retentionSettings?: {
      readonly state?: 'PERMANENT'
    }
    readonly createTime?: {
      readonly seconds?: number
      readonly nanos?: number
    }
    readonly thread?: {
      readonly name?: string
    }
    readonly space?: {
      readonly spaceThreadingState?: 'GROUPED_MESSAGES'
      readonly spaceType?: 'SPACE'
      readonly threaded?: boolean
      readonly type?: 'ROOM'
      readonly name?: string
      readonly spaceHistoryState?: 'HISTORY_ON'
      readonly displayName?: string
    }
    readonly argumentText?: string
    readonly lastUpdateTime?: {
      readonly nanos?: number
      readonly seconds?: number
    }
  }
  readonly eventTime?: {
    readonly seconds?: number
    readonly nanos?: number
  }
  readonly space?: {
    readonly displayName?: string
    readonly spaceHistoryState?: 'HISTORY_ON'
    readonly spaceThreadingState?: 'GROUPED_MESSAGES'
    readonly name?: string
    readonly type?: 'ROOM'
    readonly spaceType?: 'SPACE'
    readonly threaded?: boolean
  }
  readonly user?: {
    readonly avatarUrl?: string
    readonly email?: string
    readonly displayName?: string
    readonly type?: 'HUMAN'
    readonly domainId?: string
    readonly name?: string
  }
  readonly type?: 'MESSAGE'
  readonly configCompleteRedirectUrl?: string
}

export enum Command {
  rotations = 'rotations',
  help = 'help',
}
