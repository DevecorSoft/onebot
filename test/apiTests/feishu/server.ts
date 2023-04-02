import { app } from '@/feishu/app'
import process from 'process'
import axios from 'axios'
import * as util from 'util'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
app.use((err, req, res, _) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  res.status(500).send(err.stack)
})
export const server = app.listen(3333)
process.on('SIGTERM', () => {
  log('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    log('HTTP server closed')
  })
})
log('feishu adapter is avaliable on http://localhost:3333')

axios.defaults.baseURL = 'http://localhost:3333'
axios.interceptors.request.use(request => {
  log('Starting Request: %s %s%s', request.method, request.baseURL, request.url)
  log('Request Headers: ', request.headers)
  log('Request Body: ', request.data)
  return request
})

axios.interceptors.response.use(
  response => {
    log('Response Headers: ', response.headers)
    log('Response status: %d %s', response.status, response.statusText)
    log('Response Body: ', response.data)
    return response
  },
  error => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    return Promise.reject(util.format('%s\n%d %s\n%s', error.message, error.response.status, error.response.statusText, error.response.data))
  })

function log(...args: unknown[]) {
  process.stdout.write(util.format(...args) + '\n\n')
}
