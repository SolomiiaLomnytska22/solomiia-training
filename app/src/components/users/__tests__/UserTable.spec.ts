import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import UserTable from '@/components/users/UserTable.vue'
import { User } from '@/types'
import {
  faPlus,
  faPencil,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VTooltip from '@/directives/TooltipDirective'
library.add(faPlus, faPencil, faTrashCan)
const localVue = createLocalVue()
localVue.component('FontAwesomeIcon', FontAwesomeIcon)
localVue.directive('tooltip', VTooltip)
describe('UserTable.vue', () => {
  let wrapper: Wrapper<Vue>

  beforeEach(() => {
    const defaultUsers:User[] = [
      {
        id: 1,
        name: 'John',
        surname: 'Doe',
        dateOfBirth: '1990-01-01',
        position: 'Developer',
        country: 'USA',
        online: true
      }
    ]

    wrapper = mount(UserTable, {
      localVue,
      propsData: { users: defaultUsers }
    })
  })

  it('renders user data when users are provided', () => {
    expect(wrapper.findAll('tbody tr')).toHaveLength(1)
    expect(wrapper.find('.online-dot').exists()).toBe(true)
  })

  it('renders loading message when no users are provided', async () => {
    await wrapper.setProps({ users: [] })
    expect(wrapper.find('p').text()).toBe('Waiting for your data!')
  })

  it('emits edit event when Edit button is clicked', async () => {
    const editButton = wrapper.findComponent(FontAwesomeIcon)
    await editButton.trigger('click')

    expect(wrapper.emitted('edit')).toHaveLength(1)
    const firstInputValue = wrapper.emitted('edit')?.[ 0 ]?.[ 0 ] ?? null
    expect(firstInputValue).toEqual(wrapper.props('users')[ 0 ])
  })

  it('emits delete event when Remove button is clicked', () => {
    const deleteButton = wrapper.findAllComponents(FontAwesomeIcon).at(1)
    deleteButton.trigger('click')

    expect(wrapper.emitted('delete')).toHaveLength(1)
    const firstInputValue = wrapper.emitted('delete')?.[ 0 ]?.[ 0 ] ?? null
    expect(firstInputValue).toEqual(wrapper.props('users')[ 0 ])
  })
})
