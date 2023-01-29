import { MessageEvent, receiveMessageEventHandler } from '@/handlers'
import { RotationItem } from '@/repositories'

describe('Given user try to check how many rotation exists', () => {
  describe('When user types "/onebot rotations"', () => {
    it('Then should list current rotations in space', () => {
      const event: MessageEvent = {
        message: {
          text: '/onebot rotations',
          space: { name: 'spaces/AAVBaaxOMxU' },
          thread: { name: 'spaces/AAVBaaxOMxU/threads/I--cu_wpt68' },
        },
      }
      const rotation_item: RotationItem = {
        id: 'c8932a71-a3fc-44eb-b4f7-fffb017b39f1',
        title: 'The title',
        timer: '1-5 *',
        participants: 'Jon A, Someone B, Devecor C'.split(', '),
        thread: 'spaces/AAABaxOMxU/threads/I--cu_wca78',
      }
      PropertiesService.getScriptProperties().setProperty('spaces/AAVBaaxOMxU', JSON.stringify({ rotations: [rotation_item] }))

      const reply = receiveMessageEventHandler(event)

      expect(reply).toEqual({ text: '[c8932a71-a3fc-44eb-b4f7-fffb017b39f1] The title "1-5 *" "Jon A, Someone B, Devecor C"' })
    })

    describe('When there is no any rotation in space so far', () => {
      const event = {
        message: {
          text: '/onebot rotations',
          thread: { name: 'spaces/AAVBaaxOMxU/threads/1jauUWh-gb8' },
          space: { name: 'spaces/AAVBaaxOMxU' },
        },
      }
      PropertiesService.getScriptProperties().setProperty('spaces/xxxxAAXOMXU', JSON.stringify({ rotations: [] }))

      const reply = receiveMessageEventHandler(event)

      expect(reply).toEqual({ text: 'Currently, there is *no rotation configured* in this space.' })
    })
  })
})
