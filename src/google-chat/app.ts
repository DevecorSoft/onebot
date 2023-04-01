import { addToSpaceEventHandler } from './AddToSpaceEventHandler'
import { receiveMessageEventHandler, MessageEvent } from './ReceiveMessageEventHandler'
import { removeFromSpaceEventHandler } from './RemoveFromSpaceEventHandler'
import { TextMessage, SpaceEvent } from './types'
import { timeDrivenTriggerEventHandler } from './TimeDrivenTriggerEventHandler'


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
