import { Command, TextMessage } from './types'
import stringArgv from 'string-argv'
import { HELP_MSG } from './helpMsg'
import { stdRotationActuator } from '@/factories/rotation'

export interface MessageEvent {
  readonly message: {
    readonly text: string
    readonly space: {
      readonly name: string
    }
    readonly thread: {
      readonly name: string
    }
  }
}

export const receiveMessageEventHandler = (event: MessageEvent): TextMessage => {
  console.log(event)
  const position_args = stringArgv(event.message.text).slice(1)

  if (position_args.length === 0) {
    return { text: HELP_MSG }
  }

  const command = position_args[0]
  switch (command) {
    case Command.rotations:
      return { text: stdRotationActuator.act(...position_args.slice(1), event.message.space.name, event.message.thread.name) }
    case Command.help:
      return { text: HELP_MSG }
    default:
      return { text: `Error: ${command} is not a /onebot command. See "/onebot help"` }
  }
}
