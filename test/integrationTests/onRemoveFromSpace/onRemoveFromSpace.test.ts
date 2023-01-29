import { SpaceEvent } from '@/handlers'
import { removeFromSpaceEventHandler } from '@/handlers/RemoveFromSpaceEventHandler'

beforeEach(() => {
  PropertiesService.getScriptProperties().setProperty('trigger_list', '')
})

describe('When user remove chat bot from his space', () => {
  it('Then should say goodbye', () => {
    PropertiesService.getScriptProperties().setProperty('trigger_list', JSON.stringify(['spaces/ONSEsbxOMxU', 'spaces/BBBBsbxOMxU']))
    const event: SpaceEvent = {
      space: { name: 'spaces/ONSEsbxOMxU' },
    }

    removeFromSpaceEventHandler(event)
    const spaces = PropertiesService.getScriptProperties().getProperty('trigger_list')

    expect(spaces).toEqual(JSON.stringify(['spaces/BBBBsbxOMxU']))
  })
})
