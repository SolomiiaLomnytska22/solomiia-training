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
  faTrashCan
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faCheckCircle,
  faCircleXmark,
  faInfoCircle,
  faExclamationTriangle,
  faPlus,
  faPencil,
  faTrashCan
)
const localVue = createLocalVue()
localVue.component('FontAwesomeIcon', FontAwesomeIcon)
jest.mock('axios', () => ({
  get: jest.fn(),
  delete: jest.fn()
}))

describe('Users.vue', () => {
  let wrapper: Wrapper<Vue>

  beforeEach(() => {
    wrapper = mount(Users, {
      localVue
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('fetches data on mount', () => {
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/users')
    expect((wrapper.vm as any).users).toEqual([])
  })

  it('opens UserInfoModal when Add button is clicked', async () => {
    await wrapper.find('.heading Button').trigger('click')
    expect((wrapper.vm as any).showUserInfoModal).toBe(true)
    expect((wrapper.vm as any).selectedUser).toBeNull()
  })

  it('opens UserInfoModal when Edit button is clicked', async () => {
    const usersData = [ { id: 1, name: 'John', surname: 'Doe' } ]
    await (wrapper.vm as any).getData()
    wrapper.findComponent(UserTable).vm.$emit('edit', usersData[ 0 ])
    expect((wrapper.vm as any).showUserInfoModal).toBe(true)
    expect((wrapper.vm as any).selectedUser).toEqual(usersData[ 0 ])
  })

  it('opens ConfirmationDialog when Delete button is clicked', async () => {
    const usersData = [ { id: 1, name: 'John', surname: 'Doe' } ]
    await (wrapper.vm as any).getData()
    wrapper.findComponent(UserTable).vm.$emit('delete', usersData[ 0 ])
    expect((wrapper.vm as any).showConfirmation).toBe(true)
    expect((wrapper.vm as any).selectedUser).toEqual(usersData[ 0 ])
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
    expect((wrapper.vm as any).selectedUser).toBeNull()
    expect((wrapper.vm as any).showConfirmation).toBe(false)
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
    expect((wrapper.vm as any).showConfirmation).toBe(true)
    expect((wrapper.vm as any).selectedUser).not.toBeNull()

    expect(showToastSpy).toHaveBeenCalledWith(
      'An error occurred while deleting the user.',
      'danger'
    )

    showToastSpy.mockRestore()
  })
})
