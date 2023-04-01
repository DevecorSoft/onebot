import { MessageEvent, receiveMessageEventHandler } from '@/google-chat'
import { SpaceStorage } from '@/script-properties'

describe('Given user types add rotation command on gchat', () => {
  describe('When user types title, timer and participants', () => {
    it('Then should reply the rotation added', () => {
      const event: MessageEvent = {
        message: {
          text: '/onebot rotations add "my title" "0 10 * * 1-5" "devecor, someone"',
          space: { name: 'spaces/AAVBinexwbxU' },
          thread: { name: 'spaces/AAVBinexwbxU/threads/I--cu_wpt68' },
        },
      }

      const reply = receiveMessageEventHandler(event)
      const rotations = JSON.parse(PropertiesService.getScriptProperties().getProperty('spaces/AAVBinexwbxU') || 'null') as SpaceStorage

      expect(reply).toEqual({ text: 'your rotation *added*.' })
      expect(rotations).toEqual({
        rotations: [
          {
            id: '16854480-1c99-11ed-ab84-6706cca77b2a',
            title: 'my title',
            timer: '0 10 * * 1-5',
            participants: 'devecor, someone'.split(', '),
            thread: 'spaces/AAVBinexwbxU/threads/I--cu_wpt68',
          },
        ],
      })
    })
  })
})
