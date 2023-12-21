import { mount, Wrapper } from '@vue/test-utils'
import Timeline from '@/components/about/Timeline.vue'
import Vue from 'vue'

describe('Timeline.vue', () => {
  let wrapper: Wrapper<Vue>

  beforeEach(() => {
    wrapper = mount(Timeline)
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders properly', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes('timeline')).toBe(true)
  })

  it('renders the correct number of timeline events', () => {
    const events = wrapper.findAll('.container')
    expect(events.length).toBe((wrapper.vm as any).timeline.length)
  })

  it('applies the correct style based on event id', () => {
    const events = wrapper.findAll('.container')
    events.wrappers.forEach((event, index) => {
      const expectedStyle = index % 2 === 0 ? 'right' : 'left'
      expect(event.classes(expectedStyle)).toBe(true)
    })
  })

  it('renders timeline items with correct content', () => {
    const timelineItems = wrapper.findAll('.container')
    timelineItems.wrappers.forEach((item, index) => {
      const event = (wrapper.vm as any).timeline[ index ]
      expect(item.find('h3').text()).toBe(event.title)
      expect(item.find('.event-date').text()).toBe(event.date)
      expect(item.find('p').text()).toBe(event.description)
    })
  })
})
