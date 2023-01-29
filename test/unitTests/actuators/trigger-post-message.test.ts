import { postMessage } from '@/actuators/trigger-post-message'
import { createActuator } from '@/actuators/iocActuator'

describe('Given user added one bot chat bot to his space', () => {
  describe('When the bot triggered by a time-driven trigger', () => {
    it("Then should post message to user's space", () => {
      const createService = jest.fn().mockReturnValue({
        setTokenUrl: jest.fn().mockReturnThis(),
        setPrivateKey: jest.fn().mockReturnThis(),
        setClientId: jest.fn().mockReturnThis(),
        setPropertyStore: jest.fn().mockReturnThis(),
        setScope: jest.fn().mockReturnThis(),
        getAccessToken: jest.fn().mockReturnThis(),
        hasAccess: jest.fn().mockReturnValue(true),
        getLastError: jest.fn()
      })
      const fetch = jest.fn()
      const getUserProperties = jest.fn()
      const deps = {
        oauth2: { createService },
        urlFetchApp: { fetch },
        getUserProperties: getUserProperties,
        serviceAccountCredentials: { private_key: '', client_id: '' },
      }
      createActuator(postMessage, deps).act('message', 'spaces/AAAAAAAAAAA', 'spaces/AAAAAAAAAAA/threads/TTTTTTTTTTT')

      expect(createService).toBeCalledTimes(1)
      expect(createService).toBeCalledWith('chat')
      expect(fetch).toBeCalledTimes(1)
    })
  })
})
