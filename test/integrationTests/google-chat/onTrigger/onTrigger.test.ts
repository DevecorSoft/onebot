import { timeDrivenTriggerEventHandler } from '@/google-chat/TimeDrivenTriggerEventHandler'
import { RotationItem } from '@/script-properties'

describe('Given user added one bot chat bot to his space', () => {
  describe('When the bot triggered by a time-driven trigger', () => {
    it("Then should post message to user's space", () => {
      const rotation_item: RotationItem = {
        id: '0dd5aba3-6234-417a-87c4-2138e78556cd',
        title: 'The title',
        timer: '0 10 * * 1-5',
        participants: 'Jon A, Someone B, Devecor C'.split(', '),
        thread: 'spaces/AAABaxOMxU/threads/I--cu_wca78',
      }
      PropertiesService.getScriptProperties().setProperty('trigger_list', JSON.stringify(['spaces/ONSEsbxOMxU', 'spaces/AAVsbebbbxU']))
      PropertiesService.getScriptProperties().setProperty('spaces/AAVsbebbbxU', JSON.stringify({ rotations: [rotation_item] }))
      timeDrivenTriggerEventHandler()
    })
  })
})
