import { shallowMount, Wrapper } from '@vue/test-utils'
import UserInfoModal from '@/components/users/UserInfoModal.vue'

describe('UserInfoModal.vue', () => {
  let wrapper: Wrapper<Vue>

  beforeEach(() => {
    const propsData = {
      showModal: true,
      selectedUser: null
    }

    wrapper = shallowMount(UserInfoModal, { propsData })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders when showModal is true', () => {
    expect(wrapper.find('.modal').exists()).toBe(true)
    expect(wrapper.find('.modal-content').exists()).toBe(true)
  })

  it('does not render when showModal is false', async () => {
    await wrapper.setProps({ showModal: false })
    expect(wrapper.find('.modal').exists()).toBe(false)
    expect(wrapper.find('.modal-content').exists()).toBe(false)
  })

  it('emits toggle event when closeUserInfoModal is called', () => {
    (wrapper.vm as any).closeUserInfoModal()
    expect(wrapper.emitted().toggle).toBeTruthy()
  })

  it('emits user-added event when handleUserDataSave is called', () => {
    (wrapper.vm as any).handleUserDataSave()
    expect(wrapper.emitted()[ 'user-added' ]).toBeTruthy()
  })

  it('renders the correct heading when selectedUser is null', () => {
    expect(wrapper.find('.heading h2').text()).toBe('Add New User')
  })

  it('renders the correct heading when selectedUser is not null', async () => {
    await wrapper.setProps({
      selectedUser: { name: 'John Doe', email: 'john@example.com' }
    })
    expect(wrapper.find('.heading h2').text()).toBe('Edit User')
  })
})
