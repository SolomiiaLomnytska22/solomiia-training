import { mount, createLocalVue, Wrapper } from '@vue/test-utils'
import Users from '@/Users.vue'
import axios from 'axios'
import UserTable from '@/components/users/UserTable.vue'
import ConfirmationDialog from '@/components/common/ConfirmationDialog.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faCheckCircle,
  faInfoCircle,
  faExclamationTriangle,
  faCircleXmark,
  faPlus,
  faPencil,
  faTrashCan,
  faMagnifyingGlass,
    faSortUp,
    faSortDown,
    faSort
} from '@fortawesome/free-solid-svg-icons'
import VTooltip from '@/directives/TooltipDirective'

library.add(
  faCheckCircle,
  faCircleXmark,
  faInfoCircle,
  faExclamationTriangle,
  faPlus,
  faPencil,
  faTrashCan,
    faMagnifyingGlass,
    faSortUp,
    faSortDown,
    faSort
)
const localVue = createLocalVue()
localVue.component('FontAwesomeIcon', FontAwesomeIcon)
localVue.directive('tooltip', VTooltip)
jest.mock('axios', () => ({
  get: jest.fn(),
  delete: jest.fn()
}))

describe('Users.vue', () => {
  let wrapper: Wrapper<Vue>
  const usersData = [
    { id: 1, name: 'John', surname: 'Doe', online: true },
    { id: 2, name: 'Jane', surname: 'Doe', online: false },
    { id: 3, name: 'Alice', surname: 'Smith', online: true }
  ]
  let vm: Users | any
  beforeEach(() => {
    wrapper = mount(Users, {
      localVue
    })
    vm = wrapper.vm as Users
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('fetches data on mount', () => {
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/users')
    expect(vm.users).toEqual([])
  })

  it('opens UserInfoModal when Add button is clicked', async () => {
    await wrapper.find('.heading Button').trigger('click')
    expect(vm.showUserInfoModal).toBe(true)
    expect(vm.selectedUser).toBeNull()
  })

  it('opens UserInfoModal when Edit button is clicked', async () => {
    const usersData = [ { id: 1, name: 'John', surname: 'Doe' } ]
    await vm.getData()
    wrapper.findComponent(UserTable).vm.$emit('edit', usersData[ 0 ])
    expect(vm.showUserInfoModal).toBe(true)
    expect(vm.selectedUser).toEqual(usersData[ 0 ])
  })

  it('opens ConfirmationDialog when Delete button is clicked', async () => {
    const usersData = [ { id: 1, name: 'John', surname: 'Doe' } ]
    await vm.getData()
    wrapper.findComponent(UserTable).vm.$emit('delete', usersData[ 0 ])
    expect(vm.showConfirmation).toBe(true)
    expect(vm.selectedUser).toEqual(usersData[ 0 ])
  })

  it('deletes user when dialog is confirmed', async () => {
    const showToastSpy = jest.spyOn(wrapper.vm as any, 'showToast')
    const selectedUser = { id: 1, name: 'John', surname: 'Doe' }
    await wrapper.setData({ selectedUser, showConfirmation: true })
    ;(
      axios.delete as jest.MockedFunction<typeof axios.delete>
    ).mockResolvedValueOnce({ status: 200, data: {} })

    await wrapper.findComponent(ConfirmationDialog).vm.$emit('confirm')
    await wrapper.vm.$nextTick()

    expect(axios.delete).toHaveBeenCalledWith(
      `http://localhost:3000/users/${selectedUser.id}`
    )
    expect(vm.selectedUser).toBeNull()
    expect(vm.showConfirmation).toBe(false)
    await wrapper.vm.$nextTick()
    expect(showToastSpy).toHaveBeenCalledWith(
      'Successfully deleted user.',
      'success'
    )

    showToastSpy.mockRestore()
  })

  it('handles errors when deleting user', async () => {
    const showToastSpy = jest.spyOn(wrapper.vm as any, 'showToast')
    const selectedUser = { id: 1, name: 'John', surname: 'Doe' }
    await wrapper.setData({ selectedUser, showConfirmation: true })
    ;(
      axios.delete as jest.MockedFunction<typeof axios.delete>
    ).mockRejectedValueOnce(new Error('Delete error'))

    await wrapper.findComponent(ConfirmationDialog).vm.$emit('confirm')
    await wrapper.vm.$nextTick()

    expect(axios.delete).toHaveBeenCalledWith(
      `http://localhost:3000/users/${selectedUser.id}`
    )
    expect(vm.showConfirmation).toBe(true)
    expect(vm.selectedUser).not.toBeNull()

    expect(showToastSpy).toHaveBeenCalledWith(
      'An error occurred while deleting the user.',
      'danger'
    )
    showToastSpy.mockRestore()
  })

  it('filters data by a phrase', async () => {
    await wrapper.setData({ users: usersData, searchPhrase: 'John' })

    vm.handleSearch()
    expect(vm.filteredUsers).toHaveLength(1)
  })

  it('returns all data when the empty string is entered', async () => {
    await wrapper.setData({ users: usersData, searchPhrase: '' })

    vm.handleSearch()
    expect(vm.filteredUsers).toHaveLength(3)
  })

  it('shows toast notification when the unique string is entered', async () => {
    const showToastSpy = jest.spyOn(wrapper.vm as any, 'showToast')
    await wrapper.setData({ users: usersData, searchPhrase: 'helloworld' })

    vm.handleSearch()
    expect(vm.filteredUsers).toHaveLength(3)
    expect(showToastSpy).toHaveBeenCalledWith(
      'There is no entry with your search query.',
      'warning'
    )
  })

  it('shows toast notification when the string is too long', async () => {
    const showToastSpy = jest.spyOn(wrapper.vm as any, 'showToast')
    await wrapper.setData({
      users: usersData,
      searchPhrase: Array(101).fill('x').join('')
    })

    vm.handleSearch()
    expect(vm.filteredUsers).toHaveLength(3)
    expect(showToastSpy).toHaveBeenCalledWith(
      'Your searching phrase is too long.',
      'danger'
    )
  })
})
