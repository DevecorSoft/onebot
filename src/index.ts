import {addToSpaceEventHandler, MessageEvent, receiveMessageEventHandler, removeFromSpaceEventHandler, SpaceEvent, TextMessage} from './handlers'
import { timeDrivenTriggerEventHandler } from './handlers/TimeDrivenTriggerEventHandler'

function onAddToSpace(event: SpaceEvent): TextMessage {
  return addToSpaceEventHandler(event)
}

function onMessage(event: MessageEvent): TextMessage {
  return receiveMessageEventHandler(event)
}

function onTrigger() {
  timeDrivenTriggerEventHandler()
}

function onRemoveFromSpace(event: SpaceEvent) {
  removeFromSpaceEventHandler(event)
}
