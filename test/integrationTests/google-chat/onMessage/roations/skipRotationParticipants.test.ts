import { MessageEvent, receiveMessageEventHandler } from '@/google-chat'
import { RotationItem } from '@/script-properties'

describe('Given user have rotations added', () => {
  describe('When user want to adjust specific rotation by skip subcommand', () => {
    it('Then should skip one participant', () => {
      const event: MessageEvent = {
        message: {
          text: '/onebot rotations skip "0dd5aba3-6234-417a-87c4-2138e78556cd"',
          space: { name: 'spaces/AAVBabbbbxU' },
          thread: { name: 'spaces/AAVBabbbbxU/threads/I--cu_wpt68' },
        },
      }
      const rotation_item: RotationItem = {
        id: '0dd5aba3-6234-417a-87c4-2138e78556cd',
        title: 'The title',
        timer: '1-5 *',
        participants: 'Jon A, Someone B, Devecor C'.split(', '),
        thread: 'spaces/AAABaxOMxU/threads/I--cu_wca78',
      }
      PropertiesService.getScriptProperties().setProperty('spaces/AAVBabbbbxU', JSON.stringify({ rotations: [rotation_item] }))

      const reply = receiveMessageEventHandler(event)

      expect(reply).toEqual({ text: '1 participant(s) of "`The title`" was *skipped*, next will be @Someone B.' })
    })
  })
})
