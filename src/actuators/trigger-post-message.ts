import { SpacesMessage } from '@/handlers/types'
import { Actable } from '@/actuators/iocActuator'

export interface PostMessageDeps {
  readonly oauth2: OAuth2
  readonly urlFetchApp: UrlFetchApp
  readonly getUserProperties: () => Properties
  readonly serviceAccountCredentials: ServiceAccountCredentials
}

export interface PostMessage {
  (message: string, spaceName: string, threadName: string): void
}

export const postMessage: Actable<PostMessageDeps, PostMessage> = function (message, spaceName, threadName) {
  const service = this.oauth2
    .createService('chat')
    .setTokenUrl('https://accounts.google.com/o/oauth2/token')
    .setPrivateKey(this.serviceAccountCredentials.private_key)
    .setClientId(this.serviceAccountCredentials.client_id)
    .setPropertyStore(this.getUserProperties())
    .setScope('https://www.googleapis.com/auth/chat.bot')

  if (!service.hasAccess()) {
    console.log('Authentication error: %s', service.getLastError());
    return;
  }

  console.log(spaceName)
  const url = `https://chat.googleapis.com/v1/${spaceName}/messages`
  const payload: SpacesMessage = {
    text: message,
    thread: { name: threadName },
  }

  try {
    const response = this.urlFetchApp.fetch(url, {
      method: 'post',
      headers: { Authorization: 'Bearer ' + service.getAccessToken() },
      contentType: 'application/json',
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    })
    console.log(response.getResponseCode())
    console.log(response.getContentText())
  } catch (e) {
    console.log('Api error: ', e)
  }
}
