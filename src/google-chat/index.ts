import { addToSpaceEventHandler } from './AddToSpaceEventHandler'
import { receiveMessageEventHandler, MessageEvent } from './ReceiveMessageEventHandler'
import { removeFromSpaceEventHandler } from './RemoveFromSpaceEventHandler'
import { TextMessage, SpaceEvent } from './types'
import { timeDrivenTriggerEventHandler } from './TimeDrivenTriggerEventHandler'
export { addToSpaceEventHandler } from './AddToSpaceEventHandler'
export { receiveMessageEventHandler, MessageEvent } from './ReceiveMessageEventHandler'
export { removeFromSpaceEventHandler } from './RemoveFromSpaceEventHandler'
export { TextMessage, SpaceEvent } from './types'
export { timeDrivenTriggerEventHandler } from './TimeDrivenTriggerEventHandler'


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
