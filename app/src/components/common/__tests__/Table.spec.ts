import { createLocalVue, shallowMount, Wrapper } from '@vue/test-utils'
import Table from '@/components/common/Table.vue'
import { TableColumn } from '@/types'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons'

library.add(faSortUp, faSortDown, faSort)
const localVue = createLocalVue()
localVue.component('FontAwesomeIcon', FontAwesomeIcon)

type DataItem = {
  id: number
  name: string
  age: number
}

describe('Table.vue', () => {
  let wrapper: Wrapper<Vue>
  const columns: TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age', isSortable: true },
    { key: 'action', label: 'Action', slot: 'action' }
  ]

  const data: DataItem[] = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Doe', age: 25 },
    { id: 3, name: 'Tom Doe', age: 45 }
  ]

  beforeEach(() => {
    wrapper = shallowMount(Table, {
      propsData: { columns, data },
      scopedSlots: {
        action: function () {
          return this.$createElement('button')
        }
      },
      localVue
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders table data correctly', () => {
    expect(wrapper.find('.user-table').exists()).toBe(true)
    expect(wrapper.findAll('thead th').length).toBe(columns.length)
    expect(wrapper.findAll('tbody tr').length).toBe(data.length)
    let cellValue: string
    data.forEach((item: DataItem, rowIndex: number) => {
      columns.forEach((column: TableColumn, colIndex: number) => {
        if (column.slot) {
          expect(
            wrapper
              .find(
                `tbody tr:nth-child(${rowIndex + 1}) td:nth-child(${
                  colIndex + 1
                })`
              )
              .exists()
          ).toBe(true)
        } else {
          cellValue = wrapper
            .find(
              `tbody tr:nth-child(${rowIndex + 1}) td:nth-child(${
                colIndex + 1
              })`
            )
            .text()
          expect(cellValue).toBe((item as any)[ column.key ].toString())
        }
      })
    })
  })

  it('renders slot correctly', () => {
    data.forEach((_item: DataItem, rowIndex: number) => {
      columns.forEach((column: TableColumn, colIndex: number) => {
        if (column.slot) {
          expect(
            wrapper
              .find(
                `tbody tr:nth-child(${rowIndex + 1}) td:nth-child(${
                  colIndex + 1
                }) button`
              )
              .exists()
          ).toBe(true)
        }
      })
    })
  })

  it('renders empty table when columns and data array is empty', async () => {
    await wrapper.setProps({ columns: [], data: [] })
    expect(wrapper.find('thead').exists()).toBe(false)
    expect(wrapper.find('tbody').exists()).toBe(false)
  })

  it('does not render header row when columns array is empty', async () => {
    await wrapper.setProps({ columns: [] })
    expect(wrapper.find('thead').exists()).toBe(false)
  })

  it('renders loading message when data is empty', async () => {
    await wrapper.setProps({ data: [] })
    expect(wrapper.find('tbody p').exists()).toBe(true)
  })

  it('renders sorted data when clicking on sortable column header', async () => {
    //ascending sorting option
    await wrapper.find('thead th:nth-child(2)').trigger('click')
    expect(wrapper.findAll('tbody tr').at(0).text()).toContain(
      data[ 1 ].age.toString()
    )
    expect(wrapper.findAll('tbody tr').at(1).text()).toContain(
      data[ 0 ].age.toString()
    )
    //descending sorting option
    await wrapper.find('thead th:nth-child(2)').trigger('click')
    expect(wrapper.findAll('tbody tr').at(0).text()).toContain(
      data[ 2 ].age.toString()
    )
    expect(wrapper.findAll('tbody tr').at(1).text()).toContain(
      data[ 0 ].age.toString()
    )
    //neutral sorting option
    await wrapper.find('thead th:nth-child(2)').trigger('click')
    expect(wrapper.findAll('tbody tr').at(0).text()).toContain(
      data[ 0 ].age.toString()
    )
    expect(wrapper.findAll('tbody tr').at(1).text()).toContain(
      data[ 1 ].age.toString()
    )
  })

  it('renders correct icons when clicking on sortable column header', async () => {
    //neutral sorting option
    let icon = wrapper.find(
      'thead th:nth-child(2) span font-awesome-icon-stub[icon="fa-plus fa-sort"]'
    )
    expect(icon.exists()).toBe(true)
    //ascending sorting option
    await wrapper.find('thead th:nth-child(2)').trigger('click')
    icon = wrapper.find(
      'thead th:nth-child(2) span font-awesome-icon-stub[icon="fa-plus fa-sort-up"]'
    )
    expect(icon.exists()).toBe(true)
    //descending sorting option
    await wrapper.find('thead th:nth-child(2)').trigger('click')
    icon = wrapper.find(
      'thead th:nth-child(2) span font-awesome-icon-stub[icon="fa-plus fa-sort-down"]'
    )
    expect(icon.exists()).toBe(true)
  })

  it('does not show sorting icons in non-sortable column', () => {
    let icon = wrapper.find(
      'thead th:nth-child(0) span font-awesome-icon-stub[icon="fa-plus fa-sort-up"]'
    )
    expect(icon.exists()).toBe(false)
    icon = wrapper.find(
      'thead th:nth-child(0) span font-awesome-icon-stub[icon="fa-plus fa-sort-down"]'
    )
    expect(icon.exists()).toBe(false)
    icon = wrapper.find(
      'thead th:nth-child(0) span font-awesome-icon-stub[icon="fa-plus fa-sort"]'
    )
    expect(icon.exists()).toBe(false)
  })

  it('does not sort data when clicking on non-sortable column header', async () => {
    await wrapper.find('thead th:nth-child(1)').trigger('click')
    expect(wrapper.findAll('tbody tr').at(0).text()).toContain(
      data[ 0 ].age.toString()
    )
    expect(wrapper.findAll('tbody tr').at(1).text()).toContain(
      data[ 1 ].age.toString()
    )
  })
})
