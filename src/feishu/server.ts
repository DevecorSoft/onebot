import { storage } from '@/feishu/persistentce'
import { randomUUID } from 'crypto'
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
global.PropertiesService = storage
// @ts-ignore
global.Utilities = {
  getUuid: randomUUID()
}
// @ts-ignore
global.OAuth2 = {}
// @ts-ignore
global.UrlFetchApp = {}
// @ts-ignore
global.ServiceAccountCredentials = {}
/* eslint-enable */

import('./app')
  .then(({app}) => app.listen(3000))
  .catch((e) => console.error('unable to start server!\n', e))
