import { shallowMount, Wrapper } from '@vue/test-utils'
import DateInput from '@/components/common/DateInput.vue'

describe('DateInput.vue', () => {
  let wrapper: Wrapper<Vue>

  beforeEach(() => {
    const label = 'Date Label'
    const id = 'dateInputId'
    const required = true
    const value = '2022-12-30'
    const maxDate = '2022-12-31'
    const minDate = '2021-01-01'

    wrapper = shallowMount(DateInput, {
      propsData: { label, value, id, required, maxDate, minDate }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders label and input with correct attributes', async () => {
    expect(wrapper.find('label').text()).toBe(`${wrapper.props('label')}:`)
    expect(wrapper.find('label').attributes('for')).toBe(wrapper.props('id'))
    expect(wrapper.find('input').attributes('id')).toBe(wrapper.props('id'))
    expect(wrapper.find('input').attributes('type')).toBe('date')
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe(
      wrapper.props('value')
    )
    expect(wrapper.find('input').attributes('required')).toBe('required')
    expect(wrapper.find('input').attributes('max')).toBe(
      wrapper.props('maxDate')
    )
    expect(wrapper.find('input').attributes('min')).toBe(
      wrapper.props('minDate')
    )
  })

  it('emits input event when input value changes', async () => {
    const inputField = wrapper.find('input').element as HTMLInputElement
    inputField.value = '2023-01-01'
    wrapper.find('input').trigger('input')
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted()?.input).toBeTruthy()
    expect(wrapper.emitted()?.input?.[ 0 ]?.[ 0 ]).toBe('2023-01-01')
  })
})
