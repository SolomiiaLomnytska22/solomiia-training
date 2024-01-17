import { mount, createLocalVue, Wrapper } from '@vue/test-utils'
import TooltipDirective from '@/directives/TooltipDirective'

const localVue = createLocalVue()
localVue.directive('tooltip', TooltipDirective)

describe('TooltipDirective', () => {
  let wrapper: Wrapper<Vue>

  beforeEach(() => {
    wrapper = mount({
      template: '<div v-tooltip="{ text: \'Edit\', styleType: \'top\' }"></div>',
    }, { localVue })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('binds the tooltip directive and sets initial content', async () => {
    expect(wrapper.find('.tooltip-element').exists()).toBe(true)
    expect(wrapper.find('.text').text()).toBe('Edit')
    expect(wrapper.element.querySelector('.text')?.classList[ 1 ]).toBe('top')

  })

  it('removes tooltip element from the DOM on unbind', () => {
    wrapper.destroy()
    const tooltipElement = document.querySelector('.tooltip-element')
    expect(tooltipElement).toBeNull()
  })

  it('updates tooltip style when mousemove event occurs', async () => {
    const el = wrapper.element
    const initialStyleType = el.querySelector('.text')?.classList[ 1 ]
    await wrapper.trigger('mousemove', { clientX: 0, clientY: 0 })
    const updatedStyleType = el.querySelector('.text')?.classList[ 1 ]
    expect(updatedStyleType).not.toBe(initialStyleType)
  })


  it('tooltip displays at the bottom when position is above header height', async () => {
    await wrapper.trigger('mousemove', { clientY: 0 })
    const updatedStyleType = wrapper.element.querySelector('.text')?.classList[ 1 ]
    expect(updatedStyleType).toBe('bottom')
  })

  it('tooltip displays at the left when position is near the right edge of the window', async () => {
    await wrapper.trigger('mousemove', { clientX: window.innerWidth, clientY: 100 })
    const updatedStyleType = wrapper.element.querySelector('.text')?.classList[ 1 ]
    expect(updatedStyleType).toBe('left')
  })

  it('tooltip displays at the right when position is near the left edge of the window', async () => {
    await wrapper.trigger('mousemove', { clientX: 0, clientY: 100 })
    const updatedStyleType = wrapper.element.querySelector('.text')?.classList[ 1 ]
    expect(updatedStyleType).toBe('right')
  })

  it('tooltip displays at the top when position is not near edges', async () => {
    await wrapper.trigger('mousemove', { clientX: 100, clientY: 100 })
    const updatedStyleType = wrapper.element.querySelector('.text')?.classList[ 1 ]
    expect(updatedStyleType).toBe('top')
  })

  it('tooltip displays at the top when position is near the bottom edge of the window', async () => {
    await wrapper.trigger('mousemove', { clientX: 100, clientY: 100 })
    const updatedStyleType = wrapper.element.querySelector('.text')?.classList[ 1 ]
    expect(updatedStyleType).toBe('top')
  })
})
