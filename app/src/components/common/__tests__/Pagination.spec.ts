import { mount, Wrapper } from '@vue/test-utils'
import Pagination from '@/components/common/Pagination.vue'
import Button from '@/components/common/Button.vue'
import NumberInput from '@/components/common/NumberInput.vue'

describe('Pagination.vue', () => {
  let wrapper: Wrapper<Vue>
  const totalRows: number = 100
  const currentPage: number = 1
  const rowsPerPage: number = 10
  const maxVisiblePages: number = 5

  beforeEach(() => {
    wrapper = mount(Pagination, {
      propsData: { totalRows, currentPage, rowsPerPage, maxVisiblePages }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders correct number of page buttons', () => {
    const pageButtons = wrapper
      .findAllComponents(Button)
      .filter(
        (button) =>
          !button.classes('ellipsis') &&
          !button.classes('first') &&
          !button.classes('last')
      )
    expect(pageButtons.length).toBe(maxVisiblePages + 2)
  })

  it('emits page-change event when a page button is clicked', async () => {
    const pageButton = wrapper
      .findAllComponents(Button)
      .filter((button) => !button.classes('ellipsis'))
      .at(1)
    await pageButton.trigger('click')

    expect(wrapper.emitted('page-change')).toBeTruthy()
    expect(wrapper.emitted('page-change')?.[ 0 ]).toEqual([ 1 ]) // Assuming the button is for page 1
  })

  it('emits rows-per-page-change event when the rows per page input changes', async () => {
    const numberInput = wrapper.findComponent(NumberInput)

    await numberInput.vm.$emit('input', 20)

    expect(wrapper.emitted('rows-per-page-change')).toBeTruthy()
    expect(wrapper.emitted('rows-per-page-change')?.[ 0 ]).toEqual([ 20 ])
  })

  it('emits page-change event when navigation buttons are clicked', async () => {
    await wrapper.setProps({ currentPage: 4 })
    const buttons = wrapper.findAllComponents(Button)
    const firstPageButton = buttons
      .filter((button) => button.text().includes('1'))
      .at(0)
    const lastPageButton = buttons
      .filter((button) => button.text().includes('10'))
      .at(0)
    const leftArrowButton = buttons
      .filter((button) => button.text().includes('<'))
      .at(0)
    const rightArrowButton = buttons
      .filter((button) => button.text().includes('>'))
      .at(0)

    await firstPageButton.trigger('click')
    expect(wrapper.emitted('page-change')?.[ 0 ]).toEqual([ 1 ])

    await lastPageButton.trigger('click')
    expect(wrapper.emitted('page-change')?.[ 1 ]).toEqual([ 10 ])

    await leftArrowButton.trigger('click')
    expect(wrapper.emitted('page-change')?.[ 2 ]).toEqual([ 3 ])

    await rightArrowButton.trigger('click')
    expect(wrapper.emitted('page-change')?.[ 3 ]).toEqual([ 5 ])
  })
})
