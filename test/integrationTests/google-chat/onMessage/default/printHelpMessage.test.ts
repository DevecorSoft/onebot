import { MessageEvent, receiveMessageEventHandler } from '@/google-chat'
import { HELP_MSG } from '@/google-chat/helpMsg'

describe('Given user has added the chat bot in their space', () => {
  describe("When user types only '/onebot' on gchat", () => {
    it('Then should reply the help message', () => {
      const event: MessageEvent = {
        message: {
          text: '/onebot',
          space: { name: 'spaces/AAVBajndaxU' },
          thread: { name: 'spaces/AAVBabbbbxU/threads/I--cu_wpt68' },
        },
      }

      const reply = receiveMessageEventHandler(event)

      expect(reply).toEqual({ text: HELP_MSG })
    })
  })

  describe("When user types only '/onebot help' on gchat", () => {
    it('Then should reply the help message', () => {
      const event: MessageEvent = {
        message: {
          text: '/onebot help',
          space: { name: 'spaces/AAVBabbbbxU' },
          thread: { name: 'spaces/AAVBabbbbxU/threads/I--cu_wpt68' },
        },
      }

      const reply = receiveMessageEventHandler(event)

      expect(reply).toEqual({ text: HELP_MSG })
    })
  })

  describe('When user types unsupported command', () => {
    it('Then should tell user the command is not supported', () => {
      const event: MessageEvent = {
        message: {
          text: '/onebot something',
          space: { name: 'spaces/AAVBabbbbxU' },
          thread: { name: 'spaces/AAVBabbbbxU/threads/I--cu_wpt68' },
        },
      }

      const reply = receiveMessageEventHandler(event)

      expect(reply).toEqual({ text: 'Error: something is not a /onebot command. See "/onebot help"' })
    })
  })
})
