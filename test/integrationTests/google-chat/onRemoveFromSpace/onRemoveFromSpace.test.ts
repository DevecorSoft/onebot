import { SpaceEvent } from '@/google-chat'
import { removeFromSpaceEventHandler } from '@/google-chat/RemoveFromSpaceEventHandler'

beforeEach(() => {
  PropertiesService.getScriptProperties().setProperty('spaces', '')
})

describe('When user remove chat bot from his space', () => {
  it('Then should say goodbye', () => {
    PropertiesService.getScriptProperties().setProperty('spaces', JSON.stringify(['spaces/ONSEsbxOMxU', 'spaces/BBBBsbxOMxU']))
    const event: SpaceEvent = {
      space: { name: 'spaces/ONSEsbxOMxU' },
    }

    removeFromSpaceEventHandler(event)
    const spaces = PropertiesService.getScriptProperties().getProperty('spaces')

    expect(spaces).toEqual(JSON.stringify(['spaces/BBBBsbxOMxU']))
  })
})
