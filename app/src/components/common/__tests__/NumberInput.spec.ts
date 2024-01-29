import { shallowMount, Wrapper } from '@vue/test-utils'
import NumberInput from '@/components/common/NumberInput.vue'

describe('NumberInput.vue', () => {
  let wrapper: Wrapper<Vue>

  beforeEach(() => {
    const label: string = 'Age'
    const id: string = 'age'
    const value: number = 25

    wrapper = shallowMount(NumberInput, {
      propsData: { label, id, value }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders label and input with correct props', () => {
    expect(wrapper.find('label').text()).toBe(`${wrapper.props('label')}:`)
    expect(wrapper.find('input').attributes('id')).toBe(wrapper.props('id'))
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe(wrapper.props('value').toString())
  })

  it('emits input event when input value changes', async () => {
    const inputField = wrapper.find('input');
    (inputField.element as HTMLInputElement).value = '30'
    inputField.trigger('input')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted().input).toHaveLength(1)
    const firstInputValue = wrapper.emitted().input?.[ 0 ]?.[ 0 ] ?? null
    expect(firstInputValue).toBe(30)
  })
})
