import { MessageEvent, receiveMessageEventHandler } from '@/google-chat'
import { RotationItem } from '@/script-properties'

describe('Given user have rotations added', () => {
  describe('When user want to drop specific rotation by delete subcommand', () => {
    it('Then should delete one participant', () => {
      const event: MessageEvent = {
        message: {
          text: '/onebot rotations delete "0dd5aba3-6234-417a-87c4-2138e78556cd"',
          space: { name: 'spaces/AAVsbebbbxU' },
          thread: { name: 'spaces/AAVsbebbbxU/threads/I--cu_wpt68' },
        },
      }
      const rotation_item: RotationItem = {
        id: '0dd5aba3-6234-417a-87c4-2138e78556cd',
        title: 'The title',
        timer: '1-5 *',
        participants: 'Jon A, Someone B, Devecor C'.split(', '),
        thread: 'spaces/AAABaxOMxU/threads/I--cu_wca78',
      }
      PropertiesService.getScriptProperties().setProperty('spaces/AAVsbebbbxU', JSON.stringify({ rotations: [rotation_item] }))

      const reply = receiveMessageEventHandler(event)

      expect(reply).toEqual({ text: 'The rotation of "`The title`" was *dropped*.' })
    })
  })
})
