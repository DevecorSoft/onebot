import { createActuator } from '@/actuators/iocContainer'
import { postMessage } from '@/actuators/trigger-post-message'

export const stdPostMessageActuator = createActuator(postMessage, {
  oauth2: OAuth2,
  urlFetchApp: UrlFetchApp,
  getUserProperties: PropertiesService.getUserProperties,
  serviceAccountCredentials: ServiceAccountCredentials,
})
