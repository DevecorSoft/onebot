import { addToSpaceEventHandler, SpaceEvent } from '@/google-chat'

beforeEach(() => {
  PropertiesService.getScriptProperties().setProperty('spaces', '')
})

describe('Given user add the chat bot', () => {
  describe('When receive an add to space event', () => {
    const event: SpaceEvent = {
      space: { name: 'spaces/cccceXRaJGE' },
    }

    it('Then should return a greeting as response', () => {
      const greetingMsg = addToSpaceEventHandler(event)
      const spaceNames = JSON.parse(PropertiesService.getScriptProperties().getProperty('spaces') || '[]') as string[]

      expect(greetingMsg).toEqual({ text: 'Hi! Thanks for adding me! Use /onebot to see the helps.' })
      expect(spaceNames).toEqual(['spaces/cccceXRaJGE'])
    })
  })
})
