import { shallowMount, Wrapper } from '@vue/test-utils'
import Table from '@/components/common/Table.vue'
import { TableColumn } from '@/types'

type DataItem = {
  id: number;
  name: string;
  age: number;
};

describe('Table.vue', () => {
  let wrapper: Wrapper<Vue>
  const columns:TableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'action', label: 'Action', slot:'action' },
  ]

  const data:DataItem[] = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Doe', age: 25 },
  ]

  beforeEach(() => {
    wrapper = shallowMount(Table, {
      propsData: { columns, data },
      scopedSlots: {
        action: function () {
          return this.$createElement('button');
        },
      },
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders table data correctly', () => {
    expect(wrapper.find('.user-table').exists()).toBe(true)
    expect(wrapper.findAll('thead th').length).toBe(columns.length)
    expect(wrapper.findAll('tbody tr').length).toBe(data.length)
    let cellValue:string;
    data.forEach((item:DataItem, rowIndex:number) => {
      columns.forEach((column:TableColumn, colIndex:number) => {
        if(column.slot)
        {
          expect(wrapper.find(`tbody tr:nth-child(${rowIndex + 1}) td:nth-child(${colIndex + 1})`).exists()).toBe(true)
        }else
        {
          cellValue = wrapper.find(`tbody tr:nth-child(${rowIndex + 1}) td:nth-child(${colIndex + 1})`).text()
          expect(cellValue).toBe((item as any)[ column.key ].toString())
        }

      })
    })
  })

  it('renders slot correctly', () => {
    data.forEach((_item:DataItem, rowIndex:number) => {
      columns.forEach((column:TableColumn, colIndex:number) => {
        if(column.slot)
        {
          expect(wrapper.find(`tbody tr:nth-child(${rowIndex + 1}) td:nth-child(${colIndex + 1}) button`).exists()).toBe(true)
        }
      })
    })
  })

  it('renders empty table when columns and data array is empty', async () => {
    await wrapper.setProps({ columns:[], data: [] })
    expect(wrapper.find('thead').exists()).toBe(false)
    expect(wrapper.find('tbody').exists()).toBe(false)
  })

  it('does not render header row when columns array is empty', async () => {
    await wrapper.setProps({ columns:[] })
    expect(wrapper.find('thead').exists()).toBe(false)
  })

  it('renders loading message when data is empty', async () => {
    await wrapper.setProps({ data: [] })
    expect(wrapper.find('tbody p').exists()).toBe(true)
  })

})


